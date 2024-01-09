<?php
// URL-Parameter validieren
if (!isset($_GET['url'])) {
	die('Url parameter is required');
}

$url = urldecode($_GET['url']);

$url = parse_url($url);
$curlurl = $url['scheme'] . '://' . $url['host'] .  '/public.php/webdav/';

// Die Anfrage empfangen
$request = file_get_contents("php://input");
if(empty($request)) {
	$request = '<?xml version=\"1.0\"?>\n<d:propfind  xmlns:d=\"DAV:\" xmlns:oc=\"http://owncloud.org/ns\" xmlns:nc=\"http://nextcloud.org/ns\">\n  <d:prop>\n        <d:getlastmodified />\n        <d:getetag />\n        <d:getcontenttype />\n        <d:resourcetype />\n        <oc:fileid />\n        <oc:permissions />\n        <oc:size />\n        <d:getcontentlength />\n        <nc:has-preview />\n        <oc:favorite />\n        <oc:comments-unread />\n        <oc:owner-display-name />\n        <oc:share-types />\n  </d:prop>\n</d:propfind>';
}

$method = $_SERVER['REQUEST_METHOD'];




$request_headers = getallheaders();
//$request_headers['Depth'] = 10;

$headers =[
	"Depth: ".$request_headers['Depth'],
	"authorization: ".$request_headers['Authorization'],
	"content-type: ".$request_headers['Content-Type']
];


// Die Anfrage an den Zielserver weiterleiten
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $curlurl);
curl_setopt($ch, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
curl_setopt($ch, CURLOPT_COOKIE, "ocrvzaedddzo=db210b45a61f3e4b3071648f40841efb; oc_sessionPassphrase=jUpIaQ3L44Ky7mNyMLD8GpP3OtCXk9VpmbQeoaofXc115ELeNq9AWzOtjLSVKayz2lUDQWO3stV78VEqNwD3Q7PLqu2BHi3aBndE3dbXAiy%252FBdI5jP7G01WuTbgNSkPo; __Host-nc_sameSiteCookielax=true; __Host-nc_sameSiteCookiestrict=true; oc9s00lcp9vj=dfeb6f01bd941def2381b0f3a844474b");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_ENCODING, '');
curl_setopt($ch, CURLOPT_MAXREDIRS, 10);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_URL, $curlurl);
curl_setopt($ch, CURLOPT_URL, $curlurl);

curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "$method");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch,  CURLOPT_HTTPAUTH,  CURLAUTH_BASIC);
curl_setopt($ch,  CURLOPT_PROXYAUTH,  CURLAUTH_BASIC);
curl_setopt($ch, CURLOPT_HEADER,true);
curl_setopt($ch, CURLOPT_HTTPHEADER,$headers);
$response = curl_exec($ch);
curl_close($ch);
//
// ...


// Then, after your curl_exec call:
$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$header = substr($response, 0, $header_size);
$body = substr($response, $header_size);
echo $body;
