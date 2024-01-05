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

$method = $_SERVER['REQUEST_METHOD'];

$headers = getallheaders();
$headers['Authorization'] = $_GET['auth'];

// Die Anfrage an den Zielserver weiterleiten
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $curlurl);
curl_setopt($ch, CURLOPT_POSTFIELDS, $request);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "$method");
curl_setopt($ch, CURLOPT_HEADER, getallheaders());
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);
//
// ...

$response = curl_exec($ch);

// Then, after your curl_exec call:
$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$header = substr($response, 0, $header_size);
$body = substr($response, $header_size);

var_dump($curlurl);
// Die Antwort zurückgeben
echo $body;
