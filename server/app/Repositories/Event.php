<?php
    class EventRepository extends BaseRepository{
        private $db;

        public function __construct(Database $database) {
            parent::__construct($database, "events", "event_id");
            $this->db = $database->getConnection();
        }

        public function getAllEvents(){
            $stmt = $this->db->query("SELECT * FROM events ORDER BY event_duration_from DESC");
            return $stmt->fetchAll();
        }

        public function findById($id) {
            $stmt = $this->db->prepare("SELECT * FROM events WHERE event_id = :id");
            $stmt->execute(['id' => $id]);
            return $stmt->fetch();
        }

        public function getPastEvents() {
            $stmt = $this->db->query("SELECT * FROM events WHERE event_duration_from < NOW() ORDER BY event_duration_from DESC LIMIT 3");
            return $stmt->fetchAll();
        }

        public function getUpcommingEvents() {
            $stmt = $this->db->query("SELECT * FROM events WHERE event_duration_to > NOW() ORDER BY event_duration_from DESC LIMIT 3");
            return $stmt->fetchAll();
        }
    }