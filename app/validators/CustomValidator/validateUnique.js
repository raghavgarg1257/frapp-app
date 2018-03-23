import _ from 'lodash';
import mongoose from 'mongoose';

import { isExist } from '../../utils/helpers';

const message = 'The :attribute has already been taken';

function method(value, requirement, attribute, passes) {
  const [model, column, ...except] = requirement.split(',');
  except.join(',');

  const key = isExist(column) ? column : attribute;

  mongoose.models[model]
    .findOne({ [key]: value })
    .then((obj) => {
      if (!isExist(obj)) {
        return passes();
      }
      if (isExist(except) && _.property(key)(obj) === except) {
        return passes();
      }
      return passes(false);
    })
    .catch(() => passes(false));
}

export default { name: 'unique', method, message };
