<?php
    class MemberController extends BaseController {
        public function __construct(MemberService $service) {
            parent::__construct($service);
        }

        public function search($request){
            try{
                $result = $this->service->search($_POST);
                ResponseHelper::sendSuccessResponse($result);
            } 
            catch(Exception $e){
                ResponseHelper::handleException($e);
            }
        }
    }