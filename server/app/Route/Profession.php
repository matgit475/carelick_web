<?php

	$router->addRoute("GET", "/professions", ProfessionController::class, "getAll", [
		LoggingMiddleware::class
	]);
