export const isUndefined = (obj: any): obj is undefined => typeof obj === 'undefined';

export const isNull = (obj: any): obj is null => obj === null;

export const isNil = (obj: any): obj is null => isUndefined(obj) || isNull(obj);

export const isFunction = (obj: any): obj is Function => !isNil(obj) && typeof obj === 'function';

export const isArrowFunction = (obj: any): obj is Function => isFunction(obj) && isUndefined(obj.prototype);

export const isClass = (obj: any): boolean => isFunction(obj) && !isArrowFunction(obj);
