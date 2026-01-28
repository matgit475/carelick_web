<?php

    class FieldValidationMiddleware{
        private $rules;

        public function __construct(array $rules) {
            $this->rules = $rules;
        }

        public function handle($request, $next) {
            $data = $request['body'];
            $errors = [];

            foreach ($this->rules as $field => $validator) {
                if (array_key_exists($field, $data)){
                    try {
                            $validator->assert($data[$field] ?? null);
                    } catch (\Respect\Validation\Exceptions\NestedValidationException $e) {
                        foreach ($e->getMessages() as $path => $message) {
                        $errors[$field][] = $message;
                        }
                    }
                }
            }
            if (empty($errors)){
                return ;
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