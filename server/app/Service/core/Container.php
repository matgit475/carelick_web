<?php
	class Container {
        private $instances = [];

        public function set($key, $instance) {
            $this->instances[$key] = $instance;
        }

        public function get($key) {
            if (!isset($this->instances[$key])) {
                throw new Exception("No service registered for key: " . $key);
            }
            return $this->instances[$key];
        }
    }
?>