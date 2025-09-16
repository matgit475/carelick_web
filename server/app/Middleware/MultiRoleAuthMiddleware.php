<?php
    class MultiRoleAuthMiddleware {
        private $allowedRoles;

        public function __construct(array $roles) {
            $this->allowedRoles = $roles;
        }

        public function handle($request, $next) {
            // Check if user role exists and is valid
            
            $user = UserContext::getInstance()->getUser();
            $userRole = $user['role'] ?? null;
            try{
                if (!$userRole || !in_array($userRole, $this->allowedRoles)) {
                    $allowedRolesStr = implode(", ", $this->allowedRoles);
                    throw new ForbiddenException("Forbidden: Only " . $allowedRolesStr . " can access this route");
                }
                return $next($request);
            }
            catch(Exception $e){
                ResponseHelper::handleException($e);
            }
        }
    }