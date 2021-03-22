
import { isObject } from './object';

export const mergeStyle = (...params) => {
  const style = {};

  params.forEach(param => {
    if (typeof param === 'string') {
      Object.assign(style, stringToObject(param));
    } else if (Object.prototype.toString.call(param) === '[object Object]') {
      Object.assign(style, param);
    }
  });

  return style;
};

const stringToObject = (string) => {
  const array  = string.replace(/\s/g, '').split(';'),
        result = {};

  array.forEach(item => {
    if (!item) return;

    const [ key, value ] = item.split(':');
    if (!key || !value) return;

    result[key] = value;
  });
  return result;
};

export const mergeClass = (...params) => {
  const classes = [];

  params.forEach(param => {
    if (isObject(param)) {
      for (const key in param) {
        if (!Object.prototype.hasOwnProperty.call(param, key)) continue;
        if (param[key]) classes.push(key);
      }
    } else if (Array.isArray(param)) {
      classes.concat(param);
    } else if (typeof param === 'string') {
      classes.concat(param.replace(/\s+/g, ' ').split(' '));
    }
  });

  return classes;
};


