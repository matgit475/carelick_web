<?php
    class PaymentController {
        private $paymentService;

        public function __construct(PaymentService $paymentService) {
            $this->paymentService = $paymentService;
        }

        public function create($request){
            $amount = trim($_POST['amount']);

            try{
                $result = $this->paymentService->create($amount);
                ResponseHelper::sendSuccessResponse($result);
            }
            catch(Exception $e){
                ResponseHelper::handleException($e);
            }
        }

        //Implement it
        public function ipn($request){
        }
    }