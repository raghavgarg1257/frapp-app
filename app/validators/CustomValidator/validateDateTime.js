import moment from 'moment';

const message = 'The :attribute is not a valid date/time.';

function method(value, requirement) {
  const boolArr = [];
  let format = '';

  requirement.split(',').forEach((val) => {
    const [rule, ruleValue] = val.split('=');

    switch (rule) {
      case 'format':
        format = ruleValue;
        boolArr.push(moment(value, format, true).isValid());
        break;

      case 'after':
        boolArr.push(moment(value, format, true).isAfter(ruleValue));
        break;

      case 'sameOrAfter':
        boolArr.push(moment(value, format, true).isSameOrAfter(ruleValue));
        break;

      case 'before':
        boolArr.push(moment(value, format, true).isBefore(ruleValue));
        break;

      case 'sameOrBefore':
        boolArr.push(moment(value, format, true).isSameOrBefore(ruleValue));
        break;

      case 'same':
        boolArr.push(moment(value, format, true).isSame(ruleValue));
        break;

      default:
    }
  });

  return (boolArr.indexOf(false) === -1);
}

export default { name: 'datetime', method, message };
