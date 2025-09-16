
<?php

class UserContext
{
    private static $instance;
    private $user;

    private function __construct() {} // Prevent direct instantiation

    public static function getInstance(): self
    {
        if (!self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function setUser($user)
    {
        $this->user = $user;
    }

    public function getUser()
    {
        return $this->user;
    }
}