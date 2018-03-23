import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import BaseService from './BaseService';
import { NotFoundException, UnauthorizedException } from '../utils/exceptions';
import { objectOnlyAllowedKeys } from '../utils/helpers';
import { AdminValidator } from '../validators';
import Admin, { fillables as AdminFillables } from '../models/admin';
import { globals } from '../../config/globals';

export default class AdminService extends BaseService {
  constructor(req) {
    super(req);

    this.adminValidator = new AdminValidator();
  }

  single(value, column = '_id') {
    return Admin
      .findOne({ [column]: value })
      .then((adminRecord) => {
        if (!adminRecord) {
          throw new NotFoundException('admin not found');
        }
        return adminRecord;
      });
  }

  create() {
    const usableInputs = objectOnlyAllowedKeys(this.req.body, AdminFillables);

    return this.adminValidator
      .validate(usableInputs, 'create')
      .then((inputs) => {
        const passwordHash = bcrypt.hash(inputs.password, 10);
        return Promise.all([inputs, passwordHash]);
      })
      .then((promiseResult) => {
        const [inputs, password] = promiseResult;

        const newAdmin = new Admin({ ...inputs, password });
        return newAdmin.save();
      });
  }

  login() {
    const usableInputs = objectOnlyAllowedKeys(this.req.body, ['email', 'password']);

    return this.adminValidator
      .validate(usableInputs, 'login')
      .then((inputs) => {
        const adminRecord = Admin.findOne({ email: inputs.email });
        return Promise.all([inputs, adminRecord]);
      })
      .then((promiseResult) => {
        const [inputs, adminRecord] = promiseResult;

        if (!adminRecord) {
          // throw new NotFoundException('admin not found');
          throw new UnauthorizedException('email or password is wrong');
        }

        const passwordMatch = bcrypt.compare(inputs.password, adminRecord.password);
        const token = jsonwebtoken.sign(
          {
            id: adminRecord.id,
            firstname: adminRecord.firstname,
            lastname: adminRecord.lastname,
            email: adminRecord.email,
          },
          globals.config.jwt.secret,
          { expiresIn: globals.config.jwt.expiry },
        );

        return Promise.all([adminRecord, passwordMatch, token]);
      })
      .then((promiseResult) => {
        const [adminRecord, passwordMatch, token] = promiseResult;

        if (!passwordMatch) {
          throw new UnauthorizedException('email or password is wrong');
        }

        return { ...adminRecord.toJSON(), token };
      });
  }
}
