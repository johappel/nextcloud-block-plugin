import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { createClient } from 'webdav/web';

import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl, ColorPicker, RangeControl,ToggleControl  } from '@wordpress/components';

import 'react-folder-tree/dist/style.css';
import './editor.scss';
import extractWebDavCredentials from './extract-webdav-credentials';
import parseWebdavPropfindResponse from './propfind-to-json';

export default function Edit({ attributes, setAttributes }) {
	// Sicherstellen, dass treeData und treeData.children vorhanden sind
	const children = attributes.treeChildren || [];
	const [treeData, setTreeData] = useState({
		name: "root",
		checked: 0.5,
		isOpen: true,
		children: []
	});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchProxyDirectoryContents(attributes.folderLink);

	}, [attributes.folderLink]);

	const fetchProxyDirectoryContents = async (folderLink) => {
		const webDavData = extractWebDavCredentials(folderLink);
		if (!webDavData) return;

		setIsLoading(true);

		console.log( nextcloudFolder.proxyUrl )

		const url = folderLink.replace(webDavData.credentials.username,'');
		const proxyUrl = nextcloudFolder.proxyUrl+`?url=${encodeURIComponent(url)}&auth=Basic ` + btoa(webDavData.credentials.username + ':' + webDavData.credentials.password);
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


			parseWebdavPropfindResponse(xml).then(treeData => {

				setTreeData(treeData);
				setAttributes({ "treeData": treeData });
				setIsLoading(false);
			});

		} catch (error) {
			console.error('Fehler beim Laden des Verzeichnisinhalts über Proxy', error);
			// ToDo: Fehlerbehandlung
			setIsLoading(false);
		}


	};

	const renderTree = (nodes) => {
		// Zuerst die Ordner sortieren und dann die Dateien.
		const sortedNodes = [...nodes].sort((a, b) => {
			if (a.type === 'directory' && b.type !== 'directory') {
				return -1;
			}
			if (a.type !== 'directory' && b.type === 'directory') {
				return 1;
			}
			// Wenn beide gleich sind (beides Ordner oder Dateien), nach Namen sortieren
			return a.name.localeCompare(b.name);
		});

		return sortedNodes.map((node, index) => (
			<li key={index}
				className={`node ${node.type} ${openNodes[node.fileid] ? 'open' : ''}`}
				data-id={node.fileid}
				style={{ fontSize: `${attributes.fontSize}px` }}>
				<span
					className={`${attributes.invertTextColor ? 'inverted-text-color' : ''}`}
					data-path={node.fileid}
					data-url={node.url}
					data-id={node.fileid}
					onClick={() => toggleNode(node.fileid)}
				>
					{node.name}
				</span>
				{node.children && (
					<ul className={`node-children ${openNodes[node.fileid] ? 'active' : ''}`} id={`children-${node.fileid}`}>
						{renderTree(node.children)}
					</ul>
				)}
			</li>
		));
	};
	const [openNodes, setOpenNodes] = useState({});

	const toggleNode = nodeId => {
		setOpenNodes(prevOpenNodes => ({
			...prevOpenNodes,
			[nodeId]: !prevOpenNodes[nodeId]
		}));
	};
	const toggleTextColor = () => {
		setAttributes({ invertTextColor: !attributes.invertTextColor });
	};

	// // Nur rendern, wenn children vorhanden sind
	if (attributes.treeData.children.length === 0) {
		return <p>Keine Daten verfügbar.</p>;
	}

	const nodes = attributes.treeData.children || [];
	return (
		<>
			<InspectorControls>
				<PanelBody title="Einstellungen" initialOpen={true}>
					{/* URL der Nextcloud-Freigabe */}
					<TextControl
						label="Nextcloud Freigabelink"
						value={attributes.folderLink}
						onChange={(newLink) => setAttributes({ folderLink: newLink })}
					/>

					{/* Hintergrundfarbe des Blocks */}
					<ColorPicker
						color={attributes.backgroundColor}
						onChangeComplete={(color) => setAttributes({ backgroundColor: color.hex })}
						enableAlpha
					/>

					{/* Seitenränder */}
					<RangeControl
						label="Seitenränder"
						value={attributes.margin}
						onChange={(newMargin) => setAttributes({ margin: newMargin })}
						min={0}
						max={50}
					/>

					{/* Textgröße */}
					<RangeControl
						label="Textgröße"
						value={attributes.fontSize}
						onChange={(newSize) => setAttributes({ fontSize: newSize })}
						min={10}
						max={30}
					/>

					{/* Textfarbe */}
					<ToggleControl
						label="Textfarbe invertieren"
						checked={attributes.invertTextColor}
						onChange={toggleTextColor}
					/>

				</PanelBody>
			</InspectorControls>
			<div {...useBlockProps()}>
				{isLoading ? (
					<ul>Ordnerinhalte auf deiner Nextcloud ermitteln</ul> // Hier können Sie einen detaillierteren Ladeindikator einfügen
				) : (
				<ul className={`file-tree ${attributes.invertTextColor ? 'inverted-text-color' : ''}`} style={{ backgroundColor: attributes.backgroundColor, padding: `${attributes.margin}px`}}>
					{renderTree(nodes)}
				</ul>
				)}
			</div>
		</>
	);


};
