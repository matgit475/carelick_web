
<?php

	use Respect\Validation\Validator as v;

	$router->addRoute("GET", "/current_user", AuthController::class, "current_user", [
		LoggingMiddleware::class
	]);

	$router->addRoute("POST", "/login-with-otp", AuthController::class, "login_with_otp", [
		LoggingMiddleware::class
	]);

	$router->addRoute("POST", "/login", AuthController::class, "login", [
		LoggingMiddleware::class
	]);

	$router->addRoute("POST", "/logout", AuthController::class, "logout", [
		LoggingMiddleware::class
	]);
	$router->addRoute("POST", "/register", AuthController::class, "register", [
		LoggingMiddleware::class,
		[ validationMiddleware::class,  [
			'firstName' => v::notEmpty()->setName('First Name'),
			'lastName' => v::notEmpty()->setName('Last Name'),
			'email' => v::regex('/^[^\s@]+@[^\s@]+\.[^\s@]+$/')
			->setTemplate('Email must be a valid email address.')
			->notEmpty()
			->setName('Email'),
			'lastName' => v::notEmpty()->setName('Last Name'),
			'password' => v::length(8, null)
				->setTemplate('Password must be at least 8 characters long.')
				->notEmpty()
				->setName('Password'),
			'confirmPassword' => v::notEmpty()->setName('Confirm Password'),
			
			// Checkbox validation for "termsAccepted"
			'termsAccepted' => v::trueVal()
				->setTemplate('You must accept the terms and conditions.')
				->setName('Terms Accepted'),
		]]
	]);
	$router->addRoute("POST", "/forgot_password", AuthController::class, "forgot_password",[
		LoggingMiddleware::class
	]);