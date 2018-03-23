import { isExist } from '../helpers';
import { ExceptionHandler, UnauthorizedException } from '../exceptions';
import Admin from '../../models/admin';


export default function isAdmin(req, res, next) {
  if (isExist(req.auth.owner)) {
    return next();
  }

  return Admin.findById(req.auth.token.id)
    .then((data) => {
      if (!data) {
        throw new UnauthorizedException('Invalid request. Please try again.');
      }

      req.auth.owner = { type: 'admin', data };

      return next();
    })
    .catch((err) => { new ExceptionHandler(res, err) }); // eslint-disable-line
}
