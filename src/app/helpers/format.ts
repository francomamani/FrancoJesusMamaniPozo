import { JSON } from '../types/json';

const camelToSnake = (json: any): JSON => {
  if (typeof json !== 'object' || json === null || json === undefined) {
    return json;
  }

  if (json instanceof Date) {
    return json;
  }

  const newJSON: JSON = {};
  Object.keys(json).forEach((key: string) => {
    const newKey = key.replace(
      /[A-Z]/g,
      (char: string) => `_${char.toLowerCase()}`
    );
    newJSON[newKey] = camelToSnake(json[key]);
  });
  return newJSON;
};

const snakeToCamel = (json: any): JSON => {
  if (Array.isArray(json)) {
    return json.map((el) => snakeToCamel(el));
  }

  if (typeof json !== 'object' || json === null || json === undefined) {
    return json;
  }

  if (json instanceof Date) {
    return json;
  }
  const newJSON: JSON = {};
  Object.keys(json).forEach((key: string) => {
    const newKey = key.replace(/_([a-z])/g, (_: string, char: string) =>
      char.toUpperCase()
    );
    newJSON[newKey] = snakeToCamel(json[key]);
  });
  return newJSON;
};

export { camelToSnake, snakeToCamel };
