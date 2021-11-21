import { isArray, isEmpty, isString } from './validation';

type ClassNamesItem = string | Record<string, unknown> | undefined | null | ClassNamesParams;
type ClassNamesParams = Array<ClassNamesItem>;

/**
 * @description 构造 className
 * @param params 合并项
 */
export const classnames = function (...params: ClassNamesParams) {
    const classNames: string[] = [];
    params.forEach(item => {
        if (isEmpty(item)) return;
        if (isString(item)) {
            item && classNames.push(item);
            return;
        }
        if (isArray(item)) {
            const _classNames = classnames(...item);
            _classNames && classNames.push(_classNames);
            return;
        }

        Object.keys(item).forEach(key => {
            item[key] && classNames.push(key);
        });
    });

    return classNames.join(' ');
};

let rootFontSize: number;

/**
 * @description 获取 html.fontSize
 * @returns
 */
const getRootFontSize = () => {
    if (!rootFontSize) {
        const doc = document.documentElement;
        const fontSize = doc.style.fontSize || window.getComputedStyle(doc).fontSize;

        rootFontSize = parseFloat(fontSize);
    }

    return rootFontSize;
};

const convertRem = (value: string) => {
    value = value.replace(/rem/g, '');
    return +value * getRootFontSize();
};

const convertVw = (value: string) => {
    value = value.replace(/vw/g, '');
    return (+value * window.innerWidth) / 100;
};

const convertVh = (value: string) => {
    value = value.replace(/vh/g, '');
    return (+value * window.innerHeight) / 100;
};

/**
 * @description rem、vw、vh 转 px
 * @param value
 * @returns
 */
export const unitToPx = (value: string | number) => {
    if (typeof value === 'number') {
        return value;
    }

    if (value.includes('rem')) {
        return convertRem(value);
    }
    if (value.includes('vw')) {
        return convertVw(value);
    }
    if (value.includes('vh')) {
        return convertVh(value);
    }

    return parseFloat(value);
};
