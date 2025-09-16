<?php

class EmailManager {
    private EmailService $emailService;

    public function __construct(EmailService $emailService) {
        $this->emailService = $emailService;
    }

    public function getBody($view,$data){
        // Start output buffering
        ob_start();
        include(__DIR__ . '/views/'. $view . '.php');
        return ob_get_clean();
    }

    public function sendPasswordResetEmail(string $email, string $newPassword ): bool {
        // Send email with the new password
        $subject = "Password Reset Request";
        $body = $this->getBody('passwordReset',["email"=>$email, "newPassword"=> $newPassword]);
        return $this->emailService->sendEmail($email, $subject, $body);
    }

    public function sendOtpEmail(string $email, string $otp) : bool {
        //Send email with the otp
        $subject = "Your Verification Code for Carelick Association for Development Inc.";
        $body = $this->getBody('otp', ["email"=>$email, "otp"=> $otp]);
        return $this->emailService->sendEmail($email, $subject, $body);
    }
}