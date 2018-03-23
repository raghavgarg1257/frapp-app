export function isExist(val) {
  if (
    typeof val === 'undefined' ||
    val === undefined ||
    val === null ||
    val === '' ||
    (val instanceof Array && val.length === 0) ||
    (typeof val === 'object' && Object.keys(val).length === 0)
  ) {
    return false;
  }

  return true;
}

export function ExtendableBuiltin(cls) {
  function ExtendableBuiltinClass() {
    cls.apply(this, arguments);
  }
  ExtendableBuiltinClass.prototype = Object.create(cls.prototype);
  Object.setPrototypeOf(ExtendableBuiltinClass, cls);
  return ExtendableBuiltinClass;
}

export function objectOnlyAllowedKeys(source, allowedKeys) {
  const target = {};
  Object.keys(source).forEach((key) => {
    if (allowedKeys.indexOf(key) !== -1) {
      target[key] = source[key];
    }
  });
  return target;
}

export function arrayElementNotAllowed(source, notAllowedElement) {
  return source.filter(element => notAllowedElement.indexOf(element) === -1);
}
