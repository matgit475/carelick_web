<?php
    class EventGalleryRepository extends BaseRepository{
        private $db;

        public function __construct(Database $database) {
            parent::__construct($database, "event_gallery", "event_gallery_id");
            $this->db = $database->getConnection();
        }

        public function findByEventId($id) {
            $query = "SELECT * FROM event_gallery WHERE event_id = :event_id";
            $stmt = $this->db->prepare($query);
            $stmt->bindParam(":event_id", $id, PDO::PARAM_INT);
            $stmt->execute();
            return $stmt->fetch(PDO::FETCH_ASSOC); // Returns an associative array or false if not found
        }
    }