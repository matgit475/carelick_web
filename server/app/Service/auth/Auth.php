<?php
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    class AuthService {
        private $userRepository;
        private $memberRepository;
        private $userGroupRepository;
        private $emailManager;
        private $db;

        public function __construct($userRepository, $memberRepository, $userGroupRepository, $emailManager, $db) {
            $this->userRepository = $userRepository;
            $this->memberRepository = $memberRepository;
            $this->userGroupRepository = $userGroupRepository;
            $this->emailManager = $emailManager;
            $this->db = $db;
        }
        
        private function generateOtp() {
            return random_int(100000, 999999); // securely generate 6-digit OTP
        }

        private static $secret_key = "1234567890qwertyuiopasdfghjklzxcvbnm"; // Keep this secret & secure

        public static function generateToken($userId, $role, $email, $first_name, $account_verified) {
            $payload = [
                "iat" => time(),            // Issued at
                "exp" => time() + 3600,     // Expiry (1 hour)
                "sub" => $userId,           // User ID
                "role" => $role,
                "email"=> $email,
                "first_name"=> $first_name,
                "account_verified"=> $account_verified
            ];
            return JWT::encode($payload, self::$secret_key, 'HS256');
        }

        public static function verifyToken($token) {
            return JWT::decode($token, new Key(self::$secret_key, 'HS256'));
        }

        public function loginWithOpt($email, $otp){
            // Query user from database
            $user = $this->userRepository->findByEmail($email);

            if ($user["is_email_verified"]) throw new ConflictException("Email is already verified.");
                
            // Verify user  with email
            if ($user && ($otp == $user['last_otp'])) {
                $userId = $user['id'];
                $role = $this->userGroupRepository->getRoleByUserId($userId);
                $user = $this->userRepository->find($userId);
                $email = $user["email"];
                $first_name = $user["first_name"];
                $account_verified = $user["account_verified"];
                
                $this->userRepository->markEmailVerified($userId);

                $token = $this->generateToken($userId, $role, $email, $first_name, $account_verified);
                setcookie('token', $token, [
                    'httpOnly' => true,
                    'secure' => false,
                    'sameSite' => 'Lax',
                    'path' => '/',
                    'expires' => time() + 3600,
                ]);

                return ["id"=>$userId, "role"=>$role, "email"=>$email, "first_name"=>$first_name];
            } else {
                return new UnauthorizedException("Your OTP was incorrect. Please try again.");
            }

        }

        public function login($email, $password){

            // Query user from database
            $user = $this->userRepository->findByEmail($email);

            // Verify Email with OTP
            if ($user){
                $userId = $user['id'];
                if (!$user['is_email_verified']){
                    // Ideally, generate and store real OTP here
                    $otp = $this->generateOtp();
                    $this->userRepository->saveOtpForUser($userId, $otp);
                    
                    // Send email
                    if ($this->emailManager->sendOtpEmail($email,$otp)){
                        return new UnauthorizedException("Your email address is not verified. Please check your inbox to login with OTP.");
                    }
                }
            }

            // Verify password
            if ($user && password_verify($password, $user['password'])) {
                $userId = $user['id'];
                $role = $this->userGroupRepository->getRoleByUserId($userId);
                $user = $this->userRepository->find($userId);
                $email = $user["email"];
                $first_name = $user["first_name"];
                $account_verified = $user["account_verified"];
                $token = $this->generateToken($userId, $role, $email, $first_name, $account_verified);

                setcookie('token', $token, [
                    'httpOnly' => true,
                    'secure' => false,
                    'sameSite' => 'Lax',
                    'path' => '/',
                    'expires' => time() + 3600,
                ]);

                return ["id"=>$userId, "role"=>$role, "email"=>$email, "first_name"=>$first_name];
            } else {
                return new UnauthorizedException("Your email or password was incorrect. Please try again.");
            }
        }

        public function logout(){
            setcookie('token', '', [
                'expires' => time() - 3600,
                'path' => '/',
                'secure' => false,
                'httponly' => true,
                'samesite' => 'Lax'
            ]);
            return ['message' => 'Logged out successfully'];
        }

        public function register($firstName, $lastName, $email, $password, $confirmPassword){
            // Step 1: Check if passwords are same
            if ($password !== $confirmPassword){
                return new BadRequestException("Passwords don't match!");
            }

            // Step 2: Check if the email already exists in the database
            $existingUser = $this->userRepository->findByEmail($email);
            if ($existingUser) {
                return new BadRequestException("Email is already taken!");
            }

            // Step 3: Hash the password
            $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

            // Step 4: Create the new user in the database
            try{
                $this->db->getConnection()->beginTransaction();
                $data = [
                    "email"=>$email,
                    "ip_address"=>$_SERVER['REMOTE_ADDR'],
                    "username"=>$email,
                    "password"=>$hashedPassword,
                    "salt"=>"",
                    "first_name"=>$firstName,
                    "last_name"=>$lastName,
                    "auth_token"=>"",
                    "created_on"=>time()
                ];
                $userId= $this->userRepository->create($data);
                $data = [
                    "user_id"=> $userId,
                    "group_id"=> 2  /* name = members */
                ];
                $this->userGroupRepository->create($data);
                $this->db->getConnection()->commit();
            }
            catch (Exception $e) {
                $this->db->getConnection()->rollBack();
                return $e;
            }

            // Step 5: Generate JWT token
            $user = $this->userRepository->findByEmail($email);
            $userId =$user["id"];
            $role = $this->userGroupRepository->getRoleByUserId($userId);
            $user = $this->userRepository->find($userId);
            $email = $user["email"];
            $first_name = $user["first_name"];
            $account_verified = $user["account_verified"];
            $token = $this->generateToken($userId, $role, $email, $first_name, $account_verified);

            setcookie('token', $token, [
                'httpOnly' => true,
                'secure' => false,
                'sameSite' => 'Lax',
                'path' => '/',
                'expires' => time() + 3600,
            ]);

            // Step 6: Ideally, generate and store real OTP here
            $otp = $this->generateOtp();
            $this->userRepository->saveOtpForUser($userId, $otp);

            // Step 7: Send email
            if ($this->emailManager->sendOtpEmail($email,$otp)){
                return  ["message" => "Account created successfully! Please check your email to signin with OTP."];            
            }
        }

        public function forgot_password($email){
            // Check if the email exists in database
            $user = $this->userRepository->findByEmail($email);

            if (!$user) {
                return new NotFoundException("Your email was incorrect. Please try again.");
            }

            // Generate a new temporary password
            $newPassword = bin2hex(random_bytes(4)); // 8-character random password
            $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

            // Update password in the database
            if ($this->userRepository->updatePassword($email, $hashedPassword)) {
                // Send email with the new password
                if ($this->emailManager->sendPasswordResetEmail($email,$newPassword)){
                    return ["message" => "A new password has been sent to your email"];
                }
            }
        }
    }
?>
