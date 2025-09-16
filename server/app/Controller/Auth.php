<?php
    class AuthController{
        private $authService;

        public function __construct(AuthService $authService) {
            $this->authService = $authService;
        }

        public function login($request) {
            $email = trim($request['body']['username']);
            $password = trim($request['body']['password']);
            
            try{
                $result = $this->authService->login($email, $password);
                ResponseHelper::sendSuccessResponse($result);
            }
            catch(Exception $e){
                ResponseHelper::handleException($e);
            }
        }

        public function login_with_otp($request) {
            $email = trim($request['body']['email']);
            $otp = trim($request['body']['otp']);

            try{
                $result = $this->authService->loginWithOpt($email, $otp);
                ResponseHelper::sendSuccessResponse($result);
            }
            catch(Exception $e){
                ResponseHelper::handleException($e);
            }
        }

        
        public function logout(){
           try{
                $result = $this->authService->logout();
                ResponseHelper::sendSuccessResponse($result);
            }
            catch(Exception $e){
                ResponseHelper::handleException($e);
            }
        }

        public function register($request){
            $firstName = trim($request['body']['firstName']);
            $lastName = trim($request['body']['lastName']);
            $email = trim($request['body']['email']);
            $password = trim($request['body']['password']);
            $confirmPassword = trim($request['body']['confirmPassword']);

            try{
                $result = $this->authService->register($firstName, $lastName, $email, $password, $confirmPassword);
                ResponseHelper::sendSuccessResponse($result);
            }
            catch(Exception $e){
                ResponseHelper::handleException($e);
            }
        }

        public function forgot_password($request){
            $email = trim($request['body']['email']);
            try{
                $result = $this->authService->forgot_password($email);
                ResponseHelper::sendSuccessResponse($result);
            }
            catch(Exception $e){
                ResponseHelper::handleException($e);
            }            
        }

        public function current_user($request){
            try {
                ResponseHelper::sendSuccessResponse(UserContext::getInstance()->getUser());
            } catch (Exception $e) {
                ResponseHelper::handleException($e);
            }
        }
    }
?>
