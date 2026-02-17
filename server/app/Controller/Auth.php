<?php
    class AuthController{
        private $authService;

        public function __construct(AuthService $authService) {
            $this->authService = $authService;
        }

        public function login($request) {
            $email = trim($request['body']['username']);
            $password = trim($request['body']['password']);

            ResponseHelper::res($this->authService->login($email, $password));
        }

        public function login_with_otp($request) {
            $email = trim($request['body']['email']);
            $otp = trim($request['body']['otp']);

            $result = $this->authService->loginWithOpt($email, $otp);
            ResponseHelper::res($result);
        }

        
        public function logout(){

            $result = $this->authService->logout();
            ResponseHelper::res($result);
        }

        public function register($request){
            $firstName = trim($request['body']['firstName']);
            $lastName = trim($request['body']['lastName']);
            $email = trim($request['body']['email']);
            $password = trim($request['body']['password']);
            $confirmPassword = trim($request['body']['confirmPassword']);

            $result = $this->authService->register($firstName, $lastName, $email, $password, $confirmPassword);
            ResponseHelper::res($result);
        }

        public function forgot_password($request){
            $email = trim($request['body']['email']);

            $result = $this->authService->forgot_password($email);
            ResponseHelper::res($result);           
        }

    }
?>
