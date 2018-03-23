import { ExceptionHandler, UnauthorizedException } from '../exceptions';
import User from '../../models/user';


export default function isUser(req, res, next) {
  User.findById(req.auth.token.id)
    .then((data) => {
      if (!data) {
        // not sending error because all our user protected routes are also admin protected.
        // that means we cannot use it alone in middleware
        req.auth.owner = null;
      } else if (req.params.id !== data._id.toString()) {
        throw new UnauthorizedException('Invalid request. You are not authorized to access other\'s data.');
      } else {
        req.auth.owner = { type: 'user', data };
      }
      return next();
    })
    .catch((err) => { new ExceptionHandler(res, err) }); // eslint-disable-line
}
