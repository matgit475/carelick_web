<?php

	$router->addRoute("POST", "/payment/create", PaymentController::class, "create");

	$router->addRoute("POST", "/payment/ipn", PaymentController::class, "ipn", [
		LoggingMiddleware::class
	]);