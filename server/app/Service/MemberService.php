<?php
    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;

    class MemberService extends BaseService{
        public function __construct(MemberRepository $repository) {
            parent::__construct($repository);
        }
        public function find($id) {
            $result = $this->repository->find($id);
            $user = UserContext::getInstance()->getUser();
            AuthorizeHelper::authorize($user, $result['user_id']);
            return $this->repository->find($id);
        }
        public function search($data) {
            return $this->repository->search($data);
        }
    }
?>
