export const toString = Object.prototype.toString;

/**
 * @description 是否为字符串
 * @param value: any
 * @returns {boolean}
 */
export const isString = (value: any): value is string => {
    return toString.call(value) === '[object String]';
};

/**
 * @description 是否为布尔类型
 * @param value: any
 * @returns {boolean}
 */
export const isBoolean = (value: any): value is boolean => {
    return toString.call(value) === '[object Boolean]';
};

/**
 * @description 是否为 null
 * @param value: any
 * @returns {boolean}
 */
export const isNull = (value: any): value is string => {
    return toString.call(value) === '[object Null]';
};

/**
 * @description 是否为对象
 * @param value: any
 * @returns {boolean}
 */
export const isObject = (value: any): value is object => {
    return toString.call(value) === '[object Object]';
};

/**
 * @description 是否为数字
 * @param value: any
 * @returns {boolean}
 */
export const isNumber = (value: any): value is number => {
    return toString.call(value) === '[object Number]';
};

/**
 * @description 是否为数组
 * @param value: any
 * @returns {boolean}
 */
export const isArray =
    Array.isArray ||
    ((value: any): value is any[] => {
        return toString.call(value) === '[object Array]';
    });

/**
 * @description 是否为函数
 * @param value: any
 * @returns {boolean}
 */
export const isFunction = (value: any): value is Function => {
    return toString.call(value) === '[object Function]';
};

/**
 * @description 是否为 Promise
 * @param value: any
 * @returns {boolean}
 */
export const isPromise = (value: any): value is Promise<any> => {
    return toString.call(value) === '[object Promise]';
};

/**
 * @description 是否为整数
 * @param value: any
 * @returns {boolean}
 */
export const isInteger =
    Number.isInteger ||
    ((value: any) => {
        return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
    });

/**
 * @description 是否为空值
 * @param value
 */
export const isEmpty = (value: any): value is undefined | null => {
    return typeof value === 'undefined' || isNull(value);
};

/**
 * @description 是否普通对象，{xx} 或 new Object() 或 Object.create(null) 创建的
 * @param value
 */
export const isPlainObject = (value: any) => {
    if (!(typeof value === 'object' && value !== null)) return false;

    if (!isObject(value)) return false;

    if (Object.getPrototypeOf(value) === null) return true;

    let proto = value;
    while (Object.getPrototypeOf(proto) !== null) {
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(value) === proto;
};

/* 是否手机号 */
export const isTelephone = (value: string) =>
    /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/g.test(
        value,
    );

// 系数
const ID_CARD_COEFFICIENT = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];

const ID_CARD_REMAINDER = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];

/**
 * @description 校验身份证
 * @param id
 */
export const isIdCard = (id?: string) => {
    if (!id) return false;

    if (id.length !== 18) return false;

    // 前 17 位系数相乘的结果求和
    const total = [...id]
        .slice(0, 17)
        .reduce((sum, cur, index) => sum + +cur * ID_CARD_COEFFICIENT[index], 0);

    // 除 11 取余
    const remainder = total % 11;

    // 最后一位是否符合
    return `${ID_CARD_REMAINDER[remainder]}` === id[17];
};
