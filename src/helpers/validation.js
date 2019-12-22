/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
export const string = () => prop => obj => typeof obj[prop] === 'string';
export const number = () => prop => obj => typeof obj[prop] === 'number';
export const minLength = len => prop => obj => obj[prop].length > len;
export const maxLength = len => prop => obj => obj[prop].length < len;

export const schema = obj => {
  const rules = [];
  for (const prop in obj) {
    const arr = Array.isArray(obj[prop]) ? obj[prop] : [obj[prop]];
    arr.forEach(el => rules.push(el(prop)));
  }
  return rules;
};

export const validate = (obj, rules) => rules.every(rule => rule(obj));
