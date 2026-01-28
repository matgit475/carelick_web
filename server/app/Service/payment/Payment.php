
<?php
    class PaymentService
    {
        public function create($amount)
        {
            $paypalBase = "https://www.sandbox.paypal.com/cgi-bin/webscr";

            $params = http_build_query([
                'cmd' => '_donations',
                'business' => 'sb-0v47jl39861931@business.example.com',
                'item_name' => 'Donation',
                'amount' => $amount,
                'currency_code' => 'USD',
            ]);
            if (!preg_match('/^-?\d+$/', $amount)) {
                return new BadRequestException("Invalid amount! Must be a positive number.");
            }

            return ["url" =>$paypalBase . '?' . $params];
        }
    }