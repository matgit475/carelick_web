<?php
class UserGroupRepository extends BaseRepository{
    private PDO $db;

        public function __construct(Database $database) {
            parent::__construct($database, "users_groups", "id");
            $this->db = $database->getConnection();
        }

    /**
     * Get all group name for a given user ID
     */
    public function getRoleByUserId(int $userId){
        $sql = "
            SELECT g.name AS name
            FROM `groups` g
            JOIN users_groups ug ON g.id = ug.group_id
            WHERE ug.user_id = :user_id
            LIMIT 1
        ";

        $stmt = $this->db->prepare($sql);
        $stmt->bindParam(':user_id', $userId, PDO::PARAM_INT);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row['name'] ?? null;
    }

}