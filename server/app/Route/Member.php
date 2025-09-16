<?php

	$router->addRoute("POST", "/members/search", MemberController::class, "search");

	$router->addRoute("GET", "/members", MemberController::class, "getAll", [
		JWTAuthMiddleware::class,
		[MultiRoleAuthMiddleware::class, ["admin"]]
	]);
	
	$router->addRoute("GET", "/members/:id", MemberController::class, "find", [
		JWTAuthMiddleware::class,
		[MultiRoleAuthMiddleware::class, ["admin", "member"]]
	]);

	$router->addRoute("DELETE", "/members/:id", MemberController::class, "delete", [
		JWTAuthMiddleware::class,
		[MultiRoleAuthMiddleware::class, ["admin", "member"]]
	]);

	$router->addRoute("POST", "/members/:id", MemberController::class, "update", [
		JWTAuthMiddleware::class,
		[MultiRoleAuthMiddleware::class, ["admin", "member"]]
	]);

	$router->addRoute("POST", "/members", MemberController::class, "create", [
		JWTAuthMiddleware::class,
		[MultiRoleAuthMiddleware::class, ["admin"]]
	]);

