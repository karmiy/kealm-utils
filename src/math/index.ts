import { isEmpty } from '../validation';

/**
 * @description 从数组中移除某一项
 * @param list
 * @param item
 */
export const formatPrecision = (
    value?: number,
    options?: {
        // 精度，保留几位小数，默认 2
        precision?: number;
        // 是否严格保留位数，如 1.2 保留 2 位，isStrict 为 true 时显示 1.20，反之可移除多余 0 即 1.2
        isStrict?: boolean;
    },
) => {
    const { precision = 2, isStrict = false } = options ?? {};
    value = isEmpty(value) ? 0 : value;

    // (Math.round(value) / 100).toFixed(2);
    if (isStrict) return value.toFixed(precision);

    return `${parseFloat(value.toFixed(precision))}`;
};

console.log(formatPrecision(1.2));
