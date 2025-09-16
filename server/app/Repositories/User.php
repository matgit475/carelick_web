<?php
    class UserRepository extends BaseRepository{
        private $db;

        public function __construct(Database $database) {
            parent::__construct($database, "users", "id");
            $this->db = $database->getConnection();
        }

        public function findByEmail($email){
            $stmt = $this->db->prepare("SELECT * FROM users WHERE email = ?");
            $stmt->execute([$email]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }

        public function updatePassword($email, $newPasswordHash) {
            $stmt = $this->db->prepare("UPDATE users SET password = ? WHERE email = ?");
            return $stmt->execute([$newPasswordHash, $email]);
        }

        public function saveOtpForUser($userId, $otp) {
            $sql = "UPDATE users SET last_otp = :otp WHERE id = :userId";
            $stmt = $this->db->prepare($sql);
            return $stmt->execute([
                ':otp' => $otp,
                ':userId' => $userId
            ]);
        }
        public function markEmailVerified($userId) {
            $sql = "UPDATE users SET is_email_verified = 1 WHERE id = :userId";
            $stmt = $this->db->prepare($sql);
            return $stmt->execute([':userId' => $userId]);
        }
    }
?>