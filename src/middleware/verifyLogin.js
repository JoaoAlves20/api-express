import jwt from 'jsonwebtoken';

import config from '../config/serverConfig.js';
import { failure } from '../helpers/standardAnswer.js';

const { secret_key } = config;

export function verifyLogin(request, response, next) {
    const { authorization } = request.headers;

    if (!authorization) {
        failure(response, 'Access denied', 401, "ACCESS_DENIED");
        return;
    }

    const [prefix, token] = authorization.split(' ');

    if (prefix !== 'Bearer') {
        failure(response, 'Prefix is ​​incorrect', 401, 'PREFIX_INCORRECT');
        return;
    }

    if (!token) {
        failure(response, 'Token was not provided', 401, 'TOKEN_IS_REQUIRED');
        return;
    }

    try {
        const decoded = jwt.verify(token, secret_key);
        request.user = decoded;
        next();
    } catch (err) {
        console.error('Error:', err.message);
        failure(response, 'Incorrect or expired token', 401, 'WRONG_TOKEN');
    }
}