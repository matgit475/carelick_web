<?php
    class ProfessionService extends BaseService{
        public function __construct(ProfessionRepository $repository) {
            parent::__construct($repository);
        }
    }
?>