<?php

    class BadRequestException extends Exception {
        public function __construct($message = "Bad Request", $code = 400) {
            parent::__construct($message, $code);
        }
    }

    class UnauthorizedException extends Exception {
        public function __construct($message = "Unauthorized", $code = 401) {
            parent::__construct($message, $code);
        }
    }

    class ForbiddenException extends Exception {
        public function __construct($message = "Forbidden", $code = 403) {
            parent::__construct($message, $code);
        }
    }

    class NotFoundException extends Exception {
        public function __construct($message = "Not Found", $code = 404) {
            parent::__construct($message, $code);
        }
    }

    class UnprocessableEntityException extends Exception {
        public function __construct($message = "Unprocessable Entity", $code = 422) {
            parent::__construct(json_encode($message), $code);
        }
    }

    class ConflictException extends Exception {
        public function __construct($message = "Conflict", $code = 409) {
            parent::__construct($message, $code);
        }
    }