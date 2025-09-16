<?php
	// Define the base path

	define('BASE_PATH', dirname(__DIR__));
	
	require BASE_PATH.'/vendor/autoload.php'; // Adjust the path if needed
	require BASE_PATH.'/app/Helpers/ResponseHelper.php';
	require BASE_PATH.'/app/Helpers/AuthorizeHelper.php';

	require BASE_PATH.'/app/Exceptions/Exceptions.php';

	require BASE_PATH.'/app/Service/core/Container.php';
	require BASE_PATH.'/app/Service/core/Router.php';
	require BASE_PATH.'/app/Service/core/Database.php';
	require BASE_PATH.'/app/Service/auth/Auth.php';
	require BASE_PATH.'/app/Service/auth/UserContext.php';
	require BASE_PATH.'/app/Service/email/Email.php';
	require BASE_PATH.'/app/Service/email/EmailManager.php';
	require BASE_PATH.'/app/Service/payment/Payment.php';
	require BASE_PATH.'/app/Service/BaseService.php';
	require BASE_PATH.'/app/Service/MemberService.php';
	require BASE_PATH.'/app/Service/UserService.php';
	require BASE_PATH.'/app/Service/WebsiteService.php';

	require BASE_PATH.'/app/Repositories/Base.php';
	require BASE_PATH.'/app/Repositories/User.php';
	require BASE_PATH.'/app/Repositories/Member.php';
	require BASE_PATH.'/app/Repositories/News.php';
	require BASE_PATH.'/app/Repositories/Event.php';
	require BASE_PATH.'/app/Repositories/EventGallery.php';
	require BASE_PATH.'/app/Repositories/UserGroup.php';


	require BASE_PATH.'/app/Controller/Auth.php';
	require BASE_PATH.'/app/Controller/Payment.php';

	require BASE_PATH.'/app/Controller/Base.php';
	require BASE_PATH.'/app/Controller/User.php';
	require BASE_PATH.'/app/Controller/Member.php';
	require BASE_PATH.'/app/Controller/Website.php';

	require BASE_PATH."/app/Middleware/Middleware.php";
	require BASE_PATH."/app/Middleware/ValidationMiddleware.php";
	require BASE_PATH."/app/Middleware/JWTAuthMiddleware.php";
	require BASE_PATH.'/app/Middleware/MultiRoleAuthMiddleware.php';
	require BASE_PATH.'/app/Middleware/LoggingMiddleware.php';
	require BASE_PATH.'/app/Middleware/CorsMiddleware.php';

	// Dependency Injection Container
	$container = new Container();

	// Register services
	$container->set(Database::class, new Database("localhost", "test", "root", ""));

	$container->set(UserRepository::class, new UserRepository($container->get(Database::class)));
	$container->set(MemberRepository::class, new MemberRepository($container->get(Database::class)));
	$container->set(NewsRepository::class, new NewsRepository($container->get(Database::class)));
	$container->set(EventRepository::class, new EventRepository($container->get(Database::class)));
	$container->set(EventGalleryRepository::class, new EventGalleryRepository($container->get(Database::class)));
	$container->set(UserGroupRepository::class, new UserGroupRepository($container->get(Database::class)));

	$container->set(EmailService::class, new EmailService());
	$container->set(EmailManager::class, new EmailManager($container->get(EmailService::class)));
	$container->set(AuthService::class, new AuthService($container->get(UserRepository::class), $container->get(MemberRepository::class), $container->get(UserGroupRepository::class), $container->get(EmailManager::class),$container->get(Database::class)));
	$container->set(PaymentService::class, new PaymentService());
	$container->set(MemberService::class, new MemberService($container->get(MemberRepository::class)));
	$container->set(UserService::class, new UserService($container->get(UserRepository::class)));
	$container->set(WebsiteService::class, new WebsiteService($container->get(NewsRepository::class),$container->get(EventRepository::class),$container->get(EventGalleryRepository::class)));

	$container->set(AuthController::class, new AuthController($container->get(AuthService::class)));
	$container->set(PaymentController::class, new PaymentController($container->get(PaymentService::class)));
	$container->set(MemberController::class, new MemberController($container->get(MemberService::class)));
	$container->set(UserController::class, new UserController($container->get(UserService::class)));
	$container->set(WebsiteController::class, new WebsiteController($container->get(WebsiteService::class)));

	// Initialize Router with DI container
	$router = new Router($container);

	$router->addGlobalMiddleware([
		CorsMiddleware::class
	]);

	require BASE_PATH."/app/Route/Auth.php";
	require BASE_PATH."/app/Route/Member.php";
	require BASE_PATH."/app/Route/Payment.php";
	require BASE_PATH."/app/Route/User.php";
	require BASE_PATH."/app/Route/Website.php";

	// Dispatch Route
	$requestMethod = $_SERVER['REQUEST_METHOD'];
	$requestUri = $_SERVER['REQUEST_URI'];
	$requestUri = str_replace('/index.php', '', $requestUri);
	$requestUri = str_replace('/carelick_web', '', $requestUri);
	$requestUri = str_replace('/server', '', $requestUri);
	$requestUri = str_replace('/public', '', $requestUri);
	$requestPath = strtok($requestUri, '?'); // Remove query params
	$router->dispatch($requestMethod, $requestPath);
?>