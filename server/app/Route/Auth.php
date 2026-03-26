
<?php
	use Respect\Validation\Validator as v;

	$register_schema = [
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
		];

		$reset_password_schema = [
			'token' => v::notEmpty()->setName('Token'),
			'newPassword' => v::notEmpty()->length(8, null)
				->setTemplate('Password must be at least 8 characters long.')
				
				->setName('New Password'),
			'retypePassword' => v::notEmpty()->setName('Retype Password')
		];

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
		[ FormValidationMiddleware::class, $register_schema ]
	]);

	$router->addRoute("POST", "/register/field/validate", AuthController::class, "register" , [
		LoggingMiddleware::class,
		[ FieldValidationMiddleware::class, $register_schema ]
	]);

	$router->addRoute("POST", "/forgot_password", AuthController::class, "forgot_password", [
		LoggingMiddleware::class
	]);

	$router->addRoute("POST", "/reset_password",  AuthController::class, "reset_password", [
		LoggingMiddleware::class,
		[ FormValidationMiddleware::class, $reset_password_schema ]
	]);

	$router->addRoute("POST", "/reset_password/field/validate", AuthController::class, "reset_password" , [
		LoggingMiddleware::class,
		[ FieldValidationMiddleware::class, $reset_password_schema ]
	]);