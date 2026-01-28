<?php
    class WebsiteController{
        private $websiteService;
        public function __construct(WebsiteService $service) {
            $this->websiteService = $service;
        }

        public function events($request){
            $result = $this->websiteService->events();
            ResponseHelper::res($result);
        }

        public function home($request){
            $result = $this->websiteService->home();
            ResponseHelper::res($result);
        }

        public function news($request){
            $result = $this->websiteService->news();
            ResponseHelper::res($result);
        }

        public function event($request){
            $id = $request['params']['id'];
            $result = $this->websiteService->event($id);
            ResponseHelper::res($result);
        }
    }