import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useState, useEffect } from '@wordpress/element';
import { createClient } from 'webdav';
import SortableTree from '@uniweb/react-sortable-tree';
import '@uniweb/react-sortable-tree/style.css';
import './editor.scss';
import extractWebDavCredentials from './extract-webdav-credentials';


export default function Edit({ attributes, setAttributes }) {
	const [treeData, setTreeData] = useState([]);

	useEffect(() => {
		fetchProxyDirectoryContents(attributes.folderLink);
	}, [attributes.folderLink]);

	const fetchProxyDirectoryContents = async (folderLink) => {
		const webDavData = extractWebDavCredentials(folderLink);
		if (!webDavData) return;

		const url = folderLink.replace(webDavData.credentials.username,'');
		// Der Proxy benötigt nur den relativen Pfad, nicht die ganze URL
		const proxyUrl = `/wp-content/plugins/nextcloud-block-plugin/proxy.php?url=${encodeURIComponent( url )}&auth=Basic `+btoa(webDavData.credentials.username+':'+webDavData.credentials.password);

		const rootPath = '/';

		const authorisation = 'Basic '+ window.btoa(webDavData.credentials.username+':'+webDavData.credentials.password);

		const client = createClient(
            proxyUrl,
			{
				headers: {
					Authorization: authorisation
				}
			}
		);

		try {
			const directoryItems = await client.getDirectoryContents(rootPath);
			const newTreeItems = directoryItems.map(item => ({
				title: item.basename,
				children: item.type === 'directory' ? [] : null,
			}));
			setTreeData(newTreeItems);
		} catch (error) {
			console.error('Fehler beim Laden des Verzeichnisinhalts über WebDAV Client', error);
		}

		// const proxyUrl = `/wp-content/plugins/nextcloud-block-plugin/proxy.php?path=${encodeURIComponent(relativePath)}&username=${encodeURIComponent(webDavData.credentials.username)}`;
		//
		// try {
		// 	const response = await fetch(proxyUrl);
		// 	const directoryItems = await response.json();
		// 	const newTreeItems = directoryItems.map(item => ({
		// 		title: item.basename,
		// 		children: item.type === 'directory' ? [] : null,
		// 	}));
		// 	setTreeData(newTreeItems);
		// } catch (error) {
		// 	console.error('Fehler beim Laden des Verzeichnisinhalts über Proxy', error);
		// 	// ToDo: Fehlerbehandlung
		// }
	};

	const handleTreeChange = newTreeData => {
		setTreeData(newTreeData);
	};

	return (
		<div {...useBlockProps()}>
			<SortableTree
				treeData={treeData}
				onChange={handleTreeChange}
				canDrag={({ node }) => !node.noDragging}
				canDrop={({ nextParent }) => !nextParent || !nextParent.noChildren}
			/>
		</div>
	);
};
