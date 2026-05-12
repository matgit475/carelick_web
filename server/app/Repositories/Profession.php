    <?php
    
    class ProfessionRepository extends BaseRepository{
        private $db;

        public function __construct(Database $database) {
            parent::__construct($database, "profession", "profession_id");
            $this->db = $database->getConnection();
        }
    }