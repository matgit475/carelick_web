<?php

	$router->addRoute("DELETE", "/users/:id", UserController::class, "delete", [
		JWTAuthMiddleware::class,
		[MultiRoleAuthMiddleware::class, ["admin"]]
	]);
