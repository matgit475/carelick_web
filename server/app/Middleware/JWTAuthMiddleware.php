<?php
    class JWTAuthMiddleware implements Middleware {
        public function handle($request, $next) {
            try{
     
                if (empty($_COOKIE['token'])) {
                    throw new UnauthorizedException("Unauthorized - No Token Provided");
                }

                $token = $_COOKIE['token'];
                $decodedToken = AuthService::verifyToken($token);

                if (!$decodedToken) {
                    throw new UnauthorizedException("Invalid or Expired Token");
                }

                // Token is valid, add user info to request
                $user = [
                    "role"=>$decodedToken->role, 
                    "id"=>$decodedToken->sub,
                    "email"=>$decodedToken->email,
                    "first_name"=>$decodedToken->first_name
                ];
                UserContext::getInstance()->setUser($user);

                return $next($request);
            }
            catch(Exception $e){
                ResponseHelper::handleException($e);
            }
        }
    }