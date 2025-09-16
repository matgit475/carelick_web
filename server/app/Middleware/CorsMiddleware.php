<?php
    class CorsMiddleware implements Middleware {
        public function handle($request, $next) {
            try{
                http_response_code(200);
                header("Access-Control-Allow-Origin: http://192.168.170.3:8000");
                header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
                header("Access-Control-Allow-Headers: Content-Type, Authorization");
                header("Access-Control-Allow-Credentials: true");

                // Handle preflight (OPTIONS) requests immediately
                if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
                    http_response_code(204);
                    exit;
                }

                return $next($request);
            }
            catch(Exception $e){
                ResponseHelper::handleException($e);
            }
        }
    }