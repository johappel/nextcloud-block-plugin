import xml2js from "xml2js";

function buildTree(flattree) {

	const data = flattree.children;
	const rootNode = { name: "root", children: [] };
	const pathMap = { "/": rootNode };

	data.forEach(item => {
		const pathParts = item.name.split('/').filter(Boolean);
		let currentPath = "";
		let currentLevel = rootNode;

		pathParts.forEach((part, index) => {
			currentPath += "/" + part;

			if (!pathMap[currentPath]) {
				pathMap[currentPath] = {
					name: part,
					type: index === pathParts.length - 1 ? item._type : 'directory',
					url: item.url,
					filename: item.filename,
					filepath: item.filepath,
					size: item.size,
					date: item.date,
					fileid: item.fileid
				};
				if(item._type ===  'directory'){
					pathMap[currentPath].children = []
				}
				currentLevel.children.push(pathMap[currentPath]);
			}

			currentLevel = pathMap[currentPath];
		});
	});
	console.log('rootNode',rootNode);
	return rootNode;
}



//const treeData = buildTree(data.children);



export default async function parseWebdavPropfindResponse(xml) {



	const root = {
		name: 'root',
		children: []
	};
	if(xml==='ERROR'){
		return root;
		console.log('xml',xml);
	}

	const parser = new xml2js.Parser();
	const result = await parser.parseStringPromise(xml);


	const paths = {};

	for (const response of result["d:multistatus"]["d:response"]) {
		const href = response["d:href"][0].replace('/public.php/webdav/','/');

		const filepath = href.substring(0, href.lastIndexOf('/')+1);
		const filename = href.substring(href.lastIndexOf('/')+1);



		const propstat = response["d:propstat"][0];
		const status = propstat["d:status"][0];
		if (status === 'HTTP/1.1 200 OK') {
			const prop = propstat["d:prop"][0];
			const fileid = prop["oc:fileid"][0];


			const resourcetype = prop["d:resourcetype"];
			const collection = resourcetype[0]['d:collection'];
			const getlastmodified = prop["d:getlastmodified"][0];
			const getetag = prop["d:getetag"][0];
			const size = (prop["d:getcontentlength"]) ? prop["d:getcontentlength"][0] : 0;

			const child = {
				name: decodeURIComponent(href),
				filename: filename,
				filepath: filepath,
				_type: collection ? 'directory' : 'file',
				url: href,
				date: getlastmodified,
				size: size,
				fileid: fileid

			};
			root.children.push(child);
		}
	}
	return buildTree(root);


}

