import CustomValidator from '../../app/validators/CustomValidator';

(function init() {
  CustomValidator('unique', true);
  CustomValidator('exist', true);
  CustomValidator('datetime');
}());
