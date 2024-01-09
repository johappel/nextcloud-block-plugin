import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { createClient } from 'webdav/web';

import FolderTree, { testData } from 'react-folder-tree';
import 'react-folder-tree/dist/style.css';

import './editor.scss';
import extractWebDavCredentials from './extract-webdav-credentials';
import parseWebdavPropfindResponse from './propfind-to-json';

export default function Edit({ attributes, setAttributes }) {
	const [treeData, setTreeData] = useState({
		name: "root",
		checked: 0.5,
		isOpen: true,
		children: []
	});

	useEffect(() => {
		fetchProxyDirectoryContents(attributes.folderLink);

	}, [attributes.folderLink]);

	const fetchProxyDirectoryContents = async (folderLink) => {
		const webDavData = extractWebDavCredentials(folderLink);
		if (!webDavData) return;

		const url = folderLink.replace(webDavData.credentials.username,'');
		const proxyUrl = `/wp-content/plugins/nextcloud-block-plugin/proxy.php?url=${encodeURIComponent(url)}&auth=Basic ` + btoa(webDavData.credentials.username + ':' + webDavData.credentials.password);
		const rootPath = '/';
		const auth = 'Basic ' + window.btoa(webDavData.credentials.username + ':' + webDavData.credentials.password);




		const client = createClient(
			proxyUrl,
			{
				headers: {
					"authorization": auth,
				}
			}
		);

		try {
			// Pfad zur proxy.php in Ihrem Plugin-Verzeichnis
			const xml = await fetch(proxyUrl, {
				method: 'PROPFIND',
				headers: {
					'Authorization': auth,
					'Content-Type': 'text/xml',
					'DEPTH': 10
				},
				body: `<?xml version="1.0"?>
          <d:propfind  xmlns:d="DAV:" xmlns:oc="http://owncloud.org/ns" xmlns:nc="http://nextcloud.org/ns">
            <d:prop>
              <d:resourcetype />
              <d:getlastmodified />
              <d:getetag />
              <oc:id />
              <oc:fileid />
              <oc:permissions />
              <oc:size />
              <oc:owner-display-name />
              <oc:owner-id />
            </d:prop>
          </d:propfind>`
			}).then(response => response.text());


			parseWebdavPropfindResponse(xml).then(treeData => setTreeData(treeData), attributes);




		} catch (error) {
			console.error('Fehler beim Laden des Verzeichnisinhalts über Proxy', error);
			// ToDo: Fehlerbehandlung
		}


	};

	const handleTreeChange = newTreeData => {
		//setTreeData(newTreeData);
	};

	//const onTreeStateChange = (state, event) => console.log(state, event);
	console.log(treeData);
	return (
		<div {...useBlockProps()}>
			<FolderTree
				data={ treeData }
				//onChange={ onTreeStateChange }
				showCheckbox={ false }
				readOnly
			/>
		</div>
	);

};
