<?php

    class validationMiddleware {
        private $rules;

        public function __construct(array $rules) {
            $this->rules = $rules;
        }

        public function handle($request, $next) {
            $data = $request['body'];
            $errors = [];

            foreach ($this->rules as $field => $validator) {
                try {
                    $validator->assert($data[$field] ?? null);
                } catch (\Respect\Validation\Exceptions\NestedValidationException $e) {
                    $errors[$field] = $e->getMessages(); // returns all messages for that field
                }
            }

            try{
                if (!empty($errors)) {
                    throw new UnprocessableEntityException(['errors' => $errors]);
                }
                if ($_GET['validateOnly'] === "false") return $next($request);
                
            }
            catch(Exception $e){
                return ResponseHelper::handleException($e);
            }
        }
    }