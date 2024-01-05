<?php
// URL-Parameter validieren
if (!isset($_GET['url'])) {
	die('Url parameter is required');
}

$url = urldecode($_GET['url']);

// Die Anfrage empfangen
$request = file_get_contents("php://input");

$method = $_SERVER['REQUEST_METHOD'];

// Die Anfrage an den Zielserver weiterleiten
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POSTFIELDS, $request);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "$method");
curl_setopt($ch, CURLOPT_HEADER, ['Depth: 0']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
curl_close($ch);

// Die Antwort zurückgeben
echo $response;
