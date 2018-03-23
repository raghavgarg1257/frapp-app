import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

import BaseService from './BaseService';
import { NotFoundException, UnauthorizedException } from '../utils/exceptions';
import { objectOnlyAllowedKeys, arrayElementNotAllowed, isExist } from '../utils/helpers';
import { UserValidator } from '../validators';
import User, { fillables as UserFillables } from '../models/user';
import { globals } from '../../config/globals';


export default class UserService extends BaseService {
  constructor(req) {
    super(req);

    this.userValidator = new UserValidator();
  }

  all() {
    return User.find();
  }

  single(value, column = '_id') {
    return User
      .findOne({ [column]: value })
      .then((userRecord) => {
        if (!userRecord) {
          throw new NotFoundException('user not found');
        }
        return userRecord;
      });
  }

  create() {
    const usableInputs = objectOnlyAllowedKeys(this.req.body, UserFillables);

    return this.userValidator
      .validate(usableInputs, 'create')
      .then((inputs) => {
        const passwordHash = bcrypt.hash(inputs.password, 10);
        return Promise.all([inputs, passwordHash]);
      })
      .then((promiseResult) => {
        const [inputs, password] = promiseResult;

        const newUser = new User({ ...inputs, password });
        return newUser.save();
      });
  }

  update(value, column = '_id') {
    const allowedKeys = arrayElementNotAllowed(UserFillables, ['email', 'password']);
    const usableInputs = objectOnlyAllowedKeys(this.req.body, allowedKeys);

    return User
      .findOne({ [column]: value })
      .then((userRecord) => {
        if (!userRecord) {
          throw new NotFoundException('user not found');
        }

        const validatePromise = this.userValidator.validate(usableInputs, 'update', userRecord);

        return Promise.all([userRecord, validatePromise]);
      })
      .then((promiseResult) => {
        const [user, inputs] = promiseResult;

        if (!isExist(inputs)) {
          return user;
        }

        return User
          .findByIdAndUpdate(user.id, { ...user, ...inputs }, { new: true });
      });
  }

  remove(userId) {
    return User
      .findByIdAndRemove(userId)
      .then((userRecord) => {
        if (!userRecord) {
          throw new NotFoundException('user not found');
        }
        return userRecord.id;
      });
  }

  login() {
    const usableInputs = objectOnlyAllowedKeys(this.req.body, ['email', 'password']);

    return this.userValidator
      .validate(usableInputs, 'login')
      .then((inputs) => {
        const userRecord = User.findOne({ email: inputs.email });
        return Promise.all([inputs, userRecord]);
      })
      .then((promiseResult) => {
        const [inputs, userRecord] = promiseResult;

        if (!userRecord) {
          // throw new NotFoundException('user not found');
          throw new UnauthorizedException('email or password is wrong');
        }

        const passwordMatch = bcrypt.compare(inputs.password, userRecord.password);
        const token = jsonwebtoken.sign(
          {
            id: userRecord.id,
            firstname: userRecord.firstname,
            lastname: userRecord.lastname,
            email: userRecord.email,
          },
          globals.config.jwt.secret,
          { expiresIn: globals.config.jwt.expiry },
        );

        return Promise.all([userRecord, passwordMatch, token]);
      })
      .then((promiseResult) => {
        const [userRecord, passwordMatch, token] = promiseResult;

        if (!passwordMatch) {
          throw new UnauthorizedException('email or password is wrong');
        }

        return { ...userRecord.toJSON(), token };
      });
  }
}
