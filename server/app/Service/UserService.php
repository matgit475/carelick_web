<?php
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    class UserService extends BaseService{
        public function __construct(UserRepository $repository) {
            parent::__construct($repository);
        }
    }
?>