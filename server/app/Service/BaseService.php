<?php
abstract class BaseService {
    protected $repository;

    public function __construct($repository) {
        $this->repository = $repository;
    }
    public function getAll() {
        return $this->repository->getAll();
    }

    public function find($id) {
        return $this->repository->find($id);
    }

    public function delete($id) {
        return $this->repository->delete($id);
    }

    public function update($id,$data) {
        return $this->repository->update($id, $data);
    }

    public function create($data) {
        return $this->repository->create($data);
    }
}