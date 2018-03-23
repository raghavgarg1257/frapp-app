import UserServices from '../services/UserService';
import responses from '../utils/responses';
import { ExceptionHandler } from '../utils/exceptions';

export default class UserController {
  static all(req, res) {
    return new UserServices(req).all()
      .then(data => responses.ok(res, data))
      .catch((err) => { new ExceptionHandler(res, err) }); // eslint-disable-line
  }

  static single(req, res) {
    return new UserServices(req).single(req.params.id)
      .then(data => responses.ok(res, data))
      .catch((err) => { new ExceptionHandler(res, err) }); // eslint-disable-line
  }

  static create(req, res) {
    return new UserServices(req).create()
      .then(data => responses.ok(res, data))
      .catch((err) => { new ExceptionHandler(res, err) }); // eslint-disable-line
  }

  static update(req, res) {
    return new UserServices(req).update(req.params.id)
      .then(data => responses.ok(res, data))
      .catch((err) => { new ExceptionHandler(res, err) }); // eslint-disable-line
  }

  static remove(req, res) {
    return new UserServices(req).remove(req.params.id)
      .then(() => responses.ok(res, null, 204))
      .catch((err) => { new ExceptionHandler(res, err) }); // eslint-disable-line
  }

  static login(req, res) {
    return new UserServices(req).login()
      .then(data => responses.ok(res, data))
      .catch((err) => { new ExceptionHandler(res, err) }); // eslint-disable-line
  }
}
