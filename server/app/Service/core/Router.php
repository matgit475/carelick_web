<?php
class Router {
    private $routes = [];
    private $container;
    private $globalMiddlewares = [];

    public function __construct($container) {
        $this->container = $container;
    }

    public function addRoute($method, $path, $controller, $action, $middlewares = []) {
        $this->routes[] = [
            'method' => strtoupper($method),
            'path' => $this->convertPathToRegex($path),
            'controller' => $controller,
            'action' => $action,
            'middlewares' => $middlewares,
            'originalPath' => $path
        ];
    }

    private function convertPathToRegex(string $path): string {
        // Convert `/members/:id` to `/members/(?P<id>[^/]+)`
        return '#^' . preg_replace_callback('/:([a-zA-Z_][a-zA-Z0-9_]*)/', function ($matches) {
            return '(?P<' . $matches[1] . '>[^/]+)';
        }, $path) . '$#';
    }

    public function addGlobalMiddleware(array $middlewares) {
        $this->globalMiddlewares = array_merge($this->globalMiddlewares, $middlewares);
    }

    public function dispatch($requestMethod, $requestPath) {
        // Run global middlewares first
        foreach ($this->globalMiddlewares as $middlewareClass) {
            $middleware = new $middlewareClass();
            $middleware->handle($_REQUEST, function($request) {
                // No-op for global middleware
                return $request;
            });
        }

        foreach ($this->routes as $route) {
            if ($route['method'] === strtoupper($requestMethod)) {
                if (preg_match($route['path'], $requestPath, $matches)) {

                    $params = array_filter($matches, 'is_string', ARRAY_FILTER_USE_KEY);

                    $controllerInstance = $this->container->get($route['controller']);
                    $action = $route['action'];

                    if (method_exists($controllerInstance, $action)) {
                        // Create Request object
                        $request = [
                            'method' => $requestMethod,
                            'params' => $params,
                            'headers' => getallheaders(),
                            'body' => json_decode(file_get_contents('php://input'), true)
                        ];
                     
                        return $this->applyMiddleware($route['middlewares'], function ($request) use ($controllerInstance, $action) {
                            return call_user_func_array([$controllerInstance, $action], [$request]);
                        }, $request);
                    } else {
                        http_response_code(404);
                        echo "Method Not Found";
                    }
                    return;
                }
            }
        }

        http_response_code(404);
        echo "Route Not Found";
    }

    private function applyMiddleware($middlewares, $final, $request) {
        if (empty($middlewares)) {
            return $final($request);
        }

        $middlewareStack = array_reverse($middlewares);

        $next = function ($request) use ($final) {
            return $final($request);
        };

        foreach ($middlewareStack as $middleware) {
            // Handle middleware with arguments
            if (is_array($middleware)) {
                $middlewareClass = $middleware[0];
                $middlewareArgs = $middleware[1] ?? [];

                $middlewareInstance = new $middlewareClass($middlewareArgs);
            } else {
                $middlewareInstance = new $middleware();
            }

            $next = function ($request) use ($middlewareInstance, $next) {
                return $middlewareInstance->handle($request, $next);
            };
        }

        return $next($request);
    }
}
?>