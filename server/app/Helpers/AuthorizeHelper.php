<?php

class AuthorizeHelper {
    public static function authorize($authUser, $user_id) {
        // If member, verify this member belongs to the logged-in user
        if ($authUser['role'] === 'member') {
            if ($user_id != $authUser['id']) {
                throw new UnauthorizedException();
            }
        }
    }
}