<?php

	$router->addRoute("GET", "/home", WebsiteController::class, "home", [
		LoggingMiddleware::class
	]);

	$router->addRoute("GET", "/events", WebsiteController::class, "events", [
		LoggingMiddleware::class
	]);

	$router->addRoute("GET", "/news", WebsiteController::class, "news", [
		LoggingMiddleware::class
	]);

	$router->addRoute("GET", "/events/:id", WebsiteController::class, "event", [
		LoggingMiddleware::class
	]);