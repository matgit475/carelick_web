<?php
    abstract class BaseController {
        private $service;
        
        public function __construct($service) {
            $this->service = $service;
        }

        public function getAll($request){
            try{
                $result = $this->service->getAll();
                ResponseHelper::sendSuccessResponse($result);
            } catch(Exception $e){
                ResponseHelper::handleException($e);
            }
        }

        public function find($request) {
            $id = $request['params']['id'];
            try {
                $result = $this->service->find($id);
                ResponseHelper::sendSuccessResponse($result);
            } catch (Exception $e) {
                ResponseHelper::handleException($e);
            }
        }

        public function delete($request){
            $id = $request['params']['id'];       
            try{
                $result = $this->service->delete($id);
                ResponseHelper::sendSuccessResponse($result);
            } catch (Exception $e) {
                ResponseHelper::handleException($e);
            }
        }

        public function update($request){
            $id = $request['params']['id'];        
            try{
                $result = $this->service->update($id,$_POST);
                ResponseHelper::sendSuccessResponse($result);
            } catch (Exception $e){
                ResponseHelper::handleException($e);
            }
        }

        public function create($request){
            try{
                $result = $this->service->create($_POST);
                ResponseHelper::sendSuccessResponse($result);
            } catch (Exception $e){
                ResponseHelper::handleException($e);
            }
        }
    }
