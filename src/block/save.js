import { useBlockProps } from '@wordpress/block-editor';


export default function save({ attributes }) {
	const treeData=attributes.treeData;
	const children = treeData.children || [];
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
			<li key={index} className={`node ${node.type}`} data-id={node.fileid}>
				<span
					className={`${attributes.invertTextColor ? 'inverted-text-color' : ''}`}
					data-path={node.fileid}
					data-url={`${attributes.folderLink}/download?path=${node.filepath}&files=${node.filename}`}
					data-id={node.fileid}
					>
					{node.name}
				</span>
				{node.children && (
					<ul className="node-children nested" id={`children-${node.fileid}`}>{renderTree(node.children)}</ul>
				)}
			</li>
		));
	};
	// // Nur rendern, wenn children vorhanden sind
	if (children.length === 0) {
		return <p>Keine Daten verfügbar.</p>;
	}

	return (
		<div {...useBlockProps.save()}>
			<ul className={`file-tree ${attributes.invertTextColor ? 'inverted-text-color' : ''}`}
				style={{ backgroundColor: attributes.backgroundColor,padding: `${attributes.margin}px`}}>
				{renderTree(children)}
			</ul>
			<details>
				<summary>Ordner Download</summary>
				<p>Alle Dateien in ein Zip Archiv packen und herunter laden.</p>
				<a href={`${attributes.folderLink}/download?path=/`}>Jetzt herunterladen</a>
			</details>
		</div>
	);
}
