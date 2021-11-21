export const toString = Object.prototype.toString;

/**
 * @description 是否为字符串
 * @param value: any
 * @returns {boolean}
 */
export const isString = function (value: any): value is string {
    return toString.call(value) === '[object String]';
};

/**
 * @description 是否为布尔类型
 * @param value: any
 * @returns {boolean}
 */
export const isBoolean = function (value: any): value is boolean {
    return toString.call(value) === '[object Boolean]';
};

/**
 * @description 是否为对象
 * @param value: any
 * @returns {boolean}
 */
export const isObject = function (value: any): value is object {
    return toString.call(value) === '[object Object]';
};

/**
 * @description 是否为数字
 * @param value: any
 * @returns {boolean}
 */
export const isNumber = function (value: any): value is number {
    return toString.call(value) === '[object Number]';
};

/**
 * @description 是否为数组
 * @param value: any
 * @returns {boolean}
 */
export const isArray =
    Array.isArray ||
    function (value: any): value is any[] {
        return toString.call(value) === '[object Array]';
    };

/**
 * @description 是否为函数
 * @param value: any
 * @returns {boolean}
 */
export const isFunction = function (value: any): value is Function {
    return toString.call(value) === '[object Function]';
};

/**
 * @description 是否为 Promise
 * @param value: any
 * @returns {boolean}
 */
export const isPromise = function (value: any): value is Promise<any> {
    return toString.call(value) === '[object Promise]';
};

/**
 * @description 是否为整数
 * @param value: any
 * @returns {boolean}
 */
export const isInteger =
    Number.isInteger ||
    function (value: any) {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    };

/**
 * @description 是否为空值
 * @param value
 */
export const isEmpty = function (value: any): value is undefined | null {
    return value === undefined || value === null;
};

/**
 * @description 是否普通对象，{xx} 或 new Object() 或 Object.create(null) 创建的
 * @param value
 */
export const isPlainObject = function (value: any) {
    if (!(typeof value === 'object' && value !== null)) return false;

    if (!isObject(value)) return false;

    if (Object.getPrototypeOf(value) === null) return true;

    let proto = value;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(value) === proto;
};
