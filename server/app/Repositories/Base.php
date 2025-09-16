 <?php

    abstract   class BaseRepository{
        private $db;
        private $table;
        private $table_id;

        public function __construct(Database $database, $table, $table_id) {
            $this->db = $database->getConnection();
            $this->table = $table;
            $this->table_id = $table_id;
        }

        public function find($id) {
            $stmt = $this->db->prepare("SELECT * FROM ".$this->table." WHERE ".$this->table_id." = :id");
            $stmt->execute([':id' => $id]);
            $result = $stmt->fetch(PDO::FETCH_ASSOC);
            return $result;
        }

        public function getAll() {
            $stmt = $this->db->query("SELECT * FROM ".$this->table." ORDER BY ".$this->table_id." DESC");
            return $stmt->fetchAll(PDO::FETCH_ASSOC);
        }

        public function delete($id) {
            $this->find($id);
            $stmt = $this->db->prepare("DELETE FROM ".$this->table." WHERE ".$this->table_id." = :id");
            return $stmt->execute([':id' => $id]);
        }

        public function create($data) {
            $fields = array_keys($data);
            $placeholders = array_map(fn($key) => ":$key", $fields);

            $sql = "INSERT INTO ".$this->table." (" . implode(', ', $fields) . ")
                    VALUES (" . implode(', ', $placeholders) . ")";

            $stmt = $this->db->prepare($sql);
            foreach ($data as $key => $value) {
                $stmt->bindValue(":$key", $value);
            }
            $stmt->execute();
            return $this->db->lastInsertId();
        }

        
        public function update($id, $data) {
            // Build the query dynamically
            $fields = [];
            $params = [];

            foreach ($data as $key => $value) {
                $fields[] = "$key = :$key";
                $params[":$key"] = $value;
            }

            $params[':id'] = $id;
            $setClause = implode(', ', $fields);

            $this->find($id);
            $sql = "UPDATE ".$this->table." SET $setClause WHERE ".$this->table_id." = :id";
            $stmt = $this->db->prepare($sql);
            return $stmt->execute($params);
        }
     }