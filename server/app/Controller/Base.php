<?php
    abstract class BaseController {
        private $service;
        
        public function __construct($service) {
            $this->service = $service;
        }

        public function getAll($request){
            $result = $this->service->getAll();
            ResponseHelper::res($result);
        }

        public function find($request) {
            $result = $this->service->find($id);
            ResponseHelper::res($result);
        }

        public function delete($request){
            $result = $this->service->delete($id);
            ResponseHelper::res($result);
        }

        public function update($request){
            $result = $this->service->update($id,$_POST);
            ResponseHelper::res($result);
        }

        public function create($request){
            $result = $this->service->create($_POST);
            ResponseHelper::res($result);
        }
    }
