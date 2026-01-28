<?php

    class FormValidationMiddleware {
        private $rules;

        public function __construct(array $rules) {
            $this->rules = $rules;
        }

        public function handle($request, $next) {
            $data = $request['body'];
            $errors = [];

            foreach ($this->rules as $field => $validator) {
                if (!array_key_exists($field, $data)) {
                    continue; // skip rules for missing keys
                }
                try {
                    $validator->assert($data[$field] ?? null);
                } catch (\Respect\Validation\Exceptions\NestedValidationException $e) {
                        foreach ($e->getMessages() as $path => $message) {
                        $errors[$field][] = $message;
                    }
                }
            }

            try{
                if (!empty($errors)) {
                    throw new UnprocessableEntityException(['errors' => $errors]);
                }
                return $next($request);     
            }
            catch(Exception $e){
                return ResponseHelper::handleException($e);
            }
        }
    }