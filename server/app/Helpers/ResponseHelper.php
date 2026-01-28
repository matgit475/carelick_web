<?php

class ResponseHelper {
    // Handle exceptions for all controllers
    public static function handleException($e) {
        $code = $e->getCode();
        if (is_numeric($code)){
            $httpCode = ($code >= 400 && $code < 600) ? $code : 500;
        } 
        else $httpCode = 500;
        error_log($e);
        http_response_code($httpCode);
        header('Content-Type: application/json');
        echo json_encode(['message' => $e->getMessage()]);
        exit;
    }

    // Common success response method
    public static function sendSuccessResponse($data, $httpCode=200) {
        http_response_code($httpCode);
        header('Content-Type: application/json');
        echo json_encode($data);
        exit;
    }

    public static function response($result): void {
        try {
            if ($result instanceof Throwable) {
                throw $result;
            }
            self::sendSuccessResponse(['message' => $result]);
        } catch (Throwable $e) {
            self::handleException($e);
        }
    }

    public static function res($result): void {
            try{
                if ($result instanceof Exception) {
                    throw $result;
                }
                self::sendSuccessResponse($result);
            }
            catch(Exception $e){
                self::handleException($e);
            }
    }
}