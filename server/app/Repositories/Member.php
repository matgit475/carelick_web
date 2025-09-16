<?php
    class MemberRepository extends BaseRepository{
        private $db;

        public function __construct(Database $database) {
            parent::__construct($database, "members", "member_id");
            $this->db = $database->getConnection();
        }

        public function createByUserId($id, $data){
            $sql = "INSERT INTO members (user_id, first_name, last_name) VALUES (:id, :first_name, :last_name)";
            $stmt = $this->db->prepare($sql);
            $stmt->execute([
                ':id' => $id,
                ':first_name'=>$data['first_name'],
                ':last_name'=>$data['last_name']
            ]);
            return $this->db->lastInsertId();
        }

        public function search($data) {
            $stmt = $this->db->prepare("
                SELECT users.id, users.email, members.id, members.first_name 
                FROM users 
                INNER JOIN members 
                ON users.id=members.user_id 
                WHERE members.first_name 
                LIKE :first_name");
            $stmt->execute([':first_name' => "%".$data["first_name"]."%"]);
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public function findByUserId($userId) {
            $stmt = $this->db->prepare("SELECT * FROM members WHERE user_id = :userId LIMIT 1");
            $stmt->execute([':userId' => $userId]);
            return $stmt->fetch(PDO::FETCH_ASSOC);
        }


    }