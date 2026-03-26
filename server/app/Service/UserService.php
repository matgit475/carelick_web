<?php
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    class UserService extends BaseService{
        public $userRepository;
        public $userGroupRepository;
        public $authService;

        public function __construct(UserRepository $userRepository, UserGroupRepository $userGroupRepository, AuthService $authService) {
            parent::__construct($userRepository);
            $this->userRepository = $userRepository;
            $this->userGroupRepository = $userGroupRepository;
            $this->authService = $authService;

        }

  
        public function get_user_account($userId){
            return $this->find($userId);
        }

        public function delete($userId){
            return $this->userRepository->delete($userId);
        }

        public function getAll() {
            return $this->userRepository->getAll();
        }

        public function admin_dashboard(){
            $totalUsers = $this->userRepository->countAll();
            $verifiedUsers = $this->userRepository->countByAccountVerified(true);
            $unverifiedUsers = $this->userRepository->countByAccountVerified(false);
            return [
                "total_users" => $totalUsers,
                "verified_users" => $verifiedUsers,
                "unverified_users" => $unverifiedUsers
            ];
        }

        public function update_account($userId, $first_name, $middle_name, $last_name, $newPassword, $retypePassword, $phone){
            
            if (($newPassword !== "") && ($retypePassword !== "")){
                // Step 1: Check if passwords are same
                if ($newPassword !== $retypePassword){
                    return new BadRequestException("Passwords don't match!");
                }

            
                // Step 2: Hash the password
                $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

                // Step 4: Update the user in the database
                $this->update($userId, 
                [
                    "first_name" => $first_name, 
                    "middle_name" => $middle_name, 
                    "last_name" => $last_name,
                    "password" => $hashedPassword,
                    "phone" => $phone
                ]);
            }
            else { 
                $this->update($userId, 
                [
                    "first_name" => $first_name, 
                    "middle_name" => $middle_name, 
                    "last_name" => $last_name,
                    "phone" => $phone
                ]);
            }

            // Step 5: Generate JWT token
            $role = $this->userGroupRepository->getRoleByUserId($userId);
            $user = $this->find($userId);
            $email = $user["email"];
            $account_verified = $user["account_verified"];
            $token = $this->authService->generateToken($userId, $role, $email, $first_name, $account_verified);

            setcookie('token', $token, [
                'httpOnly' => true,
                'secure' => false,
                'sameSite' => 'Lax',
                'path' => '/',
                'expires' => time() + 3600,
            ]);

            return [
                "id"=>$userId, 
                "role"=>$role, 
                "email"=>$email, 
                "first_name"=>$first_name,
                "message" => "Your account settings have been successfully updated!"
            ];
        }
    }
?>