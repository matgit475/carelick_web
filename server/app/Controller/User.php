<?php
    class UserController extends BaseController{
        public function __construct(UserService $service) {
            parent::__construct($service);
        }
    }