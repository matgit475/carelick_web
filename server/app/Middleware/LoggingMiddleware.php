<?php
    class LoggingMiddleware implements Middleware {
        public function handle($request, $next) {
            $logEntry = date('Y-m-d H:i:s') . " - Method: " . $_SERVER['REQUEST_METHOD'] . ", Path: " . $_SERVER['REQUEST_URI'] . "\n";
            file_put_contents("logs.txt", $logEntry, FILE_APPEND);
            return $next($request);
        }
    }
