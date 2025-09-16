<?php
$filename = basename($_GET['path']); // Prevent directory traversal
$imagePath = __DIR__ . '/photos/' . $filename;

if (file_exists($imagePath)) {
    header("Access-Control-Allow-Origin: *");

    // Get the file extension
    $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

    // Map extension to correct MIME type
    $mimeTypes = [
        'jpg' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'png' => 'image/png',
        'gif' => 'image/gif',
        'webp' => 'image/webp',
        'bmp' => 'image/bmp',
        'svg' => 'image/svg+xml'
    ];

    // Set Content-Type based on file extension
    if (array_key_exists($extension, $mimeTypes)) {
        header('Content-Type: ' . $mimeTypes[$extension]);
    } else {
        header('Content-Type: application/octet-stream');
    }

    readfile($imagePath);
    exit;
} else {
    http_response_code(404);
    echo "Image not found.";
}