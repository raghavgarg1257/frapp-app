import ValidatorJS from 'validatorjs';

import ValidationException from '../utils/exceptions/ValidationException';


export default class Validator {
  constructor() {
    if (this.constructor === Validator) {
      throw new TypeError('Abstract class "Validator" cannot be instantiated directly.');
    }

    if (this.getRules === undefined) {
      throw new TypeError('Compulsory override the functions "getRules".');
    }
  }

  getRules() {
    return {};
  }

  getMessages() {
    return {};
  }

  getAttributeNamesForHuman() {
    return {};
  }

  validate(inputs, type, meta_data = {}) {
    const validator = new ValidatorJS(
      inputs,
      this.getRules(type, meta_data),
      this.getMessages(type),
    );
    validator.setAttributeNames(this.getAttributeNamesForHuman(type));

    return new Promise((resolve, reject) => validator.checkAsync(
      () => resolve(inputs),
      () => reject(new ValidationException(validator.errors.all())),
    ));
  }
}
