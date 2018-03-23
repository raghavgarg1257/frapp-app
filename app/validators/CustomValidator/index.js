import ValidatorJS from 'validatorjs';

import validateUnique from './validateUnique';
import validateExist from './validateExist';
import validateDateTime from './validateDateTime';

const CustomValidators = {
  [validateUnique.name]: validateUnique,
  [validateExist.name]: validateExist,
  [validateDateTime.name]: validateDateTime,
};

export default function init(ruleName, async = false) {
  if (async) {
    ValidatorJS.registerAsync(
      ruleName,
      CustomValidators[ruleName].method,
      CustomValidators[ruleName].message || null,
    );
  } else {
    ValidatorJS.register(
      ruleName,
      CustomValidators[ruleName].method,
      CustomValidators[ruleName].message || null,
    );
  }
}
