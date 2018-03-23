import jsonwebtoken from 'jsonwebtoken';

import { UnauthorizedException } from '../exceptions';
import { globals } from '../../../config/globals';

export default function isUser(req, res, next) {
  const token = req.header('authorization');

  if (!token || token.split(' ')[0] !== 'Basic' || !token.split(' ')[1]) {
    throw new UnauthorizedException('Invalid request. No token provided.');
  }

  jsonwebtoken.verify(token.split(' ')[1], globals.config.jwt.secret, (err, decoded) => {
    if (err) {
      throw new UnauthorizedException('Invalid request. Token is invalid.');
    }

    req.auth = {
      token: decoded,
    };

    return next();
  });
}
