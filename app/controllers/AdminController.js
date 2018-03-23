import AdminServices from '../services/AdminService';
import responses from '../utils/responses';
import { ExceptionHandler } from '../utils/exceptions';

export default class AdminController {
  static single(req, res) {
    return new AdminServices(req).single(req.params.id)
      .then(data => responses.ok(res, data))
      .catch((err) => { new ExceptionHandler(res, err) }); // eslint-disable-line
  }

  static create(req, res) {
    return new AdminServices(req).create()
      .then(data => responses.ok(res, data))
      .catch((err) => { new ExceptionHandler(res, err) }); // eslint-disable-line
  }

  static login(req, res) {
    return new AdminServices(req).login()
      .then(data => responses.ok(res, data))
      .catch((err) => { new ExceptionHandler(res, err) }); // eslint-disable-line
  }
}
