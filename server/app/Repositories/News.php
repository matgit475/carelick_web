<?php
    class NewsRepository{
        private $db;

        public function __construct(Database $database) {
            $this->db = $database->getConnection();
        }

        public function getActiveNews() {
            $query = "SELECT * FROM news WHERE is_active = 3 ORDER BY creation_time DESC";
            $stmt = $this->db->prepare($query);
            $stmt->execute();
            return $stmt->fetchAll(PDO::FETCH_ASSOC); // Returns an array of active news
        }
    }