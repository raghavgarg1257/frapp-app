import mongoose from 'mongoose';

import { isExist } from '../../utils/helpers';

const message = 'The :attribute does not exist.';

function method(value, requirement, attribute, passes) {
  const [model, column] = requirement.split(',');

  const key = isExist(column) ? column : attribute;

  mongoose.models[model]
    .findOne({ [key]: value })
    .then(data => (isExist(data) ? passes() : passes(false)))
    .catch(() => passes(false));
}

export default { name: 'exist', method, message };
