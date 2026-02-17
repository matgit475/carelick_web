<?php
    class WebsiteController{
        private $service;
        public function __construct(PublicService $service) {
            $this->service = $service;
        }

        public function events($request){
            $result = $this->service->events();
            ResponseHelper::res($result);
        }

        public function home($request){
            $result = $this->service->home();
            ResponseHelper::res($result);
        }

        public function news($request){
            $result = $this->service->news();
            ResponseHelper::res($result);
        }

        public function event($request){
            $id = $request['params']['id'];
            $result = $this->service->event($id);
            ResponseHelper::res($result);
        }
    }