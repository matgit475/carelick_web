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
            $sql = "UPDATE users SET activation_code = :otp WHERE id = :userId";
            $stmt = $this->db->prepare($sql);
            return $stmt->execute([
                ':otp' => $otp,
                ':userId' => $userId
            ]);
        }

        public function markUserAsActive($userId) {
            $sql = "UPDATE users SET active = 1 WHERE id = :userId";
            $stmt = $this->db->prepare($sql);
            return $stmt->execute([':userId' => $userId]);
        
        }

        public function markEmailVerified($userId) {
            $sql = "UPDATE users SET is_email_verified = 1 WHERE id = :userId";
            $stmt = $this->db->prepare($sql);
            return $stmt->execute([':userId' => $userId]);
        }

        public function getAll() {
            $stmt = $this->db->query("SELECT 
            u.*,
            g.name AS role,
            p.profession_name AS profession_name
            FROM users u
            JOIN users_groups ug ON u.id = ug.user_id
            JOIN `groups` g ON ug.group_id = g.id
            JOIN members m ON u.id = m.user_id
            JOIN profession p ON m.profession_id = p.profession_id;");

            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public function countAll() {
            $stmt = $this->db->query("SELECT COUNT(*) FROM users");
            return $stmt->fetchColumn();
        }

        public function countByAccountVerified($isVerified) {
            $stmt = $this->db->prepare("SELECT COUNT(*) FROM users WHERE account_verified = ?");
            $stmt->execute([$isVerified ? "1" : "0"]);
            return $stmt->fetchColumn();
        
        }

        public function findByResetToken($token){
            $stmt = $this->db->prepare("SELECT * FROM users WHERE forgotten_password_code = ?");
            $stmt->execute([$token]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }
    }
?>