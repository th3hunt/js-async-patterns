import colors from 'colors';
import stringifyObject from 'stringify-object';

function stringify(obj) {
  return typeof obj === 'string' ? obj : stringifyObject(obj);
}

export function success(object, ...args) {
  console.log(stringify(object).green, ...args);
}

export function info(object, ...args) {
  console.log(stringify(object).white, ...args);
}

export function strong(object, ...args) {
  console.error(stringify(object).blue, ...args);
}

export function warn(object, ...args) {
  console.log(stringify(object).yellow, ...args);
}

export function error(object, ...args) {
  console.error(stringify(object).red, ...args);
}

export default {
  success, info, strong, warn, error
};
