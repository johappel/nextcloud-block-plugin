/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */
import { render } from '@wordpress/element';

import 'react-folder-tree/dist/style.css';
import extractWebDavCredentials from './extract-webdav-credentials';
import parseWebdavPropfindResponse from './propfind-to-json';
/* eslint-disable no-console */
console.log( 'Hello World! (from create-block-nextcloud-block-plugin block)' );
/* eslint-enable no-console */

document.addEventListener('DOMContentLoaded', function() {
	const syncDirectoryTrees = function () {

		const blockSelector = '.wp-block-create-block-nextcloud-block-plugin';
		const blockElements = document.querySelectorAll(blockSelector);

		blockElements.forEach((blockElement) => {

			syncTree(blockElement); // Rendere den neuen Baum
		});
	};


	const syncTree = (Element) => {
		let folderLink = Element.getAttribute('data-link');
		let folderhash = Element.getAttribute('folderhash');
		console.log('folderhash',folderhash);

		if (!folderLink) return;
		fetchDirectoryTree(folderLink,folderhash,Element);

	}
	const renderTree = (nodes,styleAttr,inverted, nested = false,dataId=0) => {
		let invertedTextColor = '';
		if(inverted){
			invertedTextColor = 'inverted-text-color';
		}
		let ulClass='file-tree'
		if(nested){
			styleAttr = '';
			ulClass='node-children nested'
		}

		console.log('renderTreeParams',nodes,styleAttr,inverted, nested);

		let html = `<ul class="${ulClass} ${invertedTextColor}" style="${styleAttr}" id="children-${dataId}">`;
		// Ordner zuerst, dann Dateien, beide alphabetisch sortiert
		nodes.sort((a, b) => {
			if (a.type !== b.type) return a.type === 'directory' ? -1 : 1;
			return a.name.localeCompare(b.name);
		}).forEach(node => {
			let openclass = '';
			if (node.children) {
				openclass = 'open';
			}
			html += `<li class="node ${node.type}" data-id="${node.fileid}">`;
			html += `<span class="${invertedTextColor} ${openclass}" data-path="${node.fileid}" data-url="${node.url}" data-id="${node.fileid}">${node.name}</span>`;
			if (node.children) {
				html += renderTree(node.children,styleAttr,inverted, true,node.fileid); // Rekursive Funktion zum Erstellen des Baums
			}
			html += '</li>';
		});
		html += '</ul>';
		return html;
	};

	const fetchDirectoryTree = async (folderLink,folderhash,Element) => {
		// Hier bleibt deine Logik zum Abrufen der Daten gleich
		const webDavData = extractWebDavCredentials(folderLink);
		if (!webDavData) return;

		const url = folderLink.replace(webDavData.credentials.username,'');
		const proxyUrl = nextcloudFolder.proxyUrl+`?url=${encodeURIComponent(url)}&auth=Basic ` + btoa(webDavData.credentials.username + ':' + webDavData.credentials.password);
		const rootPath = '/';
		const auth = 'Basic ' + window.btoa(webDavData.credentials.username + ':' + webDavData.credentials.password);

		let treeData;

		try {
			// Pfad zur proxy.php in Ihrem Plugin-Verzeichnis
			const xml = await fetch(proxyUrl, {
				method: 'PROPFIND',
				headers: {
					'Authorization': auth,
					'Content-Type': 'text/xml',
					'DEPTH': 10
				}
			}).then(response => response.text());
		    if(md5(xml) === folderhash){
				return;
			}

			parseWebdavPropfindResponse(xml).then(treeData => {

				const styleAttr =  Element.firstChild.firstChild.getAttribute('style');
				const inverted = Element.firstChild.firstChild.classList.contains('inverted-text-color');
				let treeHTML;

				treeHTML = renderTree(treeData.children,styleAttr,inverted,false); // Nutzt die neue renderTree-Funktion
				Element.firstChild.innerHTML = treeHTML; // Setzt das HTML direkt
				setTimeout(()=>wp_block_create_block_nextcloud_block_plugin_init(), 500);

			});
		} catch (error) {
			console.error('Fehler beim Laden des Verzeichnisinhalts über Proxy', error);
		}
	};

	syncDirectoryTrees();
});
