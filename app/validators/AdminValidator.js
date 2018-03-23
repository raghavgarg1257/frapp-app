import BaseValidator from './BaseValidator';

export default class LocationValidator extends BaseValidator {
  getRules(type, data = {}) {
    switch (type) {
      case 'create':
        return {
          firstname: 'required|string',
          lastname: 'required|string',
          email: 'required|email|unique:Admin,email',
          password: 'required|string',
        };

      case 'update':
        return {
          firstname: 'string',
          lastname: 'string',
          // email: `email|unique:Admin,email,${data.email}`,
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
