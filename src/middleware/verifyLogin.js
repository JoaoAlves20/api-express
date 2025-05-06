import jwt from 'jsonwebtoken';

import config from '../config/serverConfig.js';

export function verifyLogin(request, response, next) {
    const { authorization } = request.headers;

    if (!authorization) {
        response.status(401).json({ error: 'Access denied' });
        return;
    }

    const [prefix, token] = authorization.split(' ');

    if (prefix !== 'Bearer') {
        response.status(401).json({ error: 'Prefix is ​​incorrect' });
        return;
    }

    if (!token) {
        response.status(401).json({ error: 'Token was not provided' });
        return;
    }

    try {
        const decoded = jwt.verify(token, config.secret_key.toString());
        request.user = decoded;
        next();
    } catch (err) {
        console.error('Error:', err.message);

        response.status(401).json({ error: 'Incorrect or expired token' });
    }
}