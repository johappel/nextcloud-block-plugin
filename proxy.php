<?php
// Autoload Composer dependencies
require_once __DIR__ . '/vendor/autoload.php';
// URL-Parameter validieren
if (!isset($_GET['url'])) {
	die('Url parameter is required');
}

// Die URL des Ziel-Servers
$url = urldecode($_GET['url']);
$url = parse_url($url);
$curlurl = $url['scheme'] . '://' . $url['host'] .  '/public.php/webdav/';

// Die Anfrage empfangen
$request_headers = getallheaders();

$headers =[
	"Depth"  => $request_headers['Depth'],
	"authorization"  =>  $request_headers['Authorization'],
	"Content-Type"  => $request_headers['Content-Type']
];
$method = $_SERVER['REQUEST_METHOD'];

$body = <<<XML
<?xml version="1.0"?>
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
</d:propfind>
XML;


$client = new GuzzleHttp\Client;
if($method === "PROPFIND") {
	$response = $client->request($method, $curlurl, [
		\GuzzleHttp\RequestOptions::HEADERS => $headers,
		\GuzzleHttp\RequestOptions::BODY => $body
	]);
}else{
	$response = $client->request($method, $curlurl, [
		\GuzzleHttp\RequestOptions::HEADERS => $headers
	]);
}
if($response->getStatusCode() != 200){
	echo "Gültige Nextcloud URL eingeben";
}else{
	echo $response->getBody();
}

