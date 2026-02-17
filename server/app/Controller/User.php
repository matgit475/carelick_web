<?php
    class UserController extends BaseController{
        public $userService;
        public function __construct(UserService $userService) {
            parent::__construct($userService);
            $this->userService = $userService;
        }


        public function account($request){
                $view = $_GET['view'];
                $userId = UserContext::getInstance()->getUser()["id"];
                if ($view == "basic") {
                    $result =  UserContext::getInstance()->getUser();
                }
                else $result = $this->userService->get_user_account($userId);
                ResponseHelper::res($result);
        }
        
        public function update_account($request){
            $firstName = trim($request['body']['first_name']);
            $middleName = trim($request['body']['middle_name']);
            $lastName = trim($request['body']['last_name']);
            $newPassword = trim($request['body']['newPassword'] ?? '');
            $retypePassword = trim($request['body']['retypePassword'] ?? '');
            $phone = trim($request['body']['phone']);

            $userId = UserContext::getInstance()->getUser()["id"];
            $result = $this->userService->update_account($userId, $firstName, $middleName, $lastName, $newPassword, $retypePassword, $phone);
            ResponseHelper::res($result);
        }
    }