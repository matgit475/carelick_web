<?php
	use Respect\Validation\Validator as v;
	$account_schema = [
			'first_name' => v::notEmpty()->setName('First Name'),
			'last_name' => v::notEmpty()->setName('Last Name'),
			'newPassword' => v::notEmpty()->length(5, null)->setName('New Password'),
			'retypePassword' => v::notEmpty()->length(5, null)->setName('Retype Password')
	];
	$router->addRoute("POST", "/update_account", UserController::class, "update_account", [
		JWTAuthMiddleware::class,
		LoggingMiddleware::class,
		[FormValidationMiddleware::class, $account_schema]
	]);

	$router->addRoute("POST", "/account/field/validate", UserController::class, "update_account", [
		JWTAuthMiddleware::class,
		LoggingMiddleware::class,
		[FieldValidationMiddleware::class, $account_schema]
	]);

	$router->addRoute("GET", "/account", UserController::class, "account", [
		JWTAuthMiddleware::class,
		LoggingMiddleware::class
	]);
