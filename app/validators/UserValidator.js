import BaseValidator from './BaseValidator';

export default class EventValidator extends BaseValidator {
  getRules(type, data = {}) {
    switch (type) {
      case 'create':
        return {
          firstname: 'required|string',
          lastname: 'required|string',
          email: 'required|email|unique:User,email',
          phone: 'digits:10',
          password: 'required|string',
        };

      case 'update':
        return {
          firstname: 'string',
          lastname: 'string',
          // email: `email|unique:User,email,${data.email}`,
          phone: 'digits:10',
          // password: 'string',
        };

      case 'login':
        return {
          email: 'required|email',
          password: 'required|string',
        };

      default:
        return {};
    }
  }
}
