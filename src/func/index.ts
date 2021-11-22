/**
 * @description 节流
 * @param func 节流函数
 * @param wait 等待时长
 * @param options 配置:
 *              leading(true: 立即执行; false: 第一次执行也等待 wait 时间)
 *              trailing(true 函数 setTimeout 异步执行效果; false 函数仅通过计算时间同步执行)
 * @returns {function(): *}
 */
export const throttle = function <T extends Array<any>>(
    func: (...args: T) => any,
    wait: number,
    options: { leading?: boolean; trailing?: boolean } = {},
) {
    const { leading = true, trailing = false } = options;
    let timeout: number | undefined,
        context: any,
        args: T | undefined,
        result: ReturnType<typeof func>;
    let previous = 0;
    const later = function () {
        previous = !leading ? 0 : Date.now() || new Date().getTime();
        timeout = undefined;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        result = func.apply(context, args!);
        if (!timeout) context = args = undefined;
    };
    const throttled = function (this: any, ...params: T) {
        const now = Date.now() || new Date().getTime();
        if (!previous && !leading) previous = now;
        // remaining 为距离下次执行 func 的时间
        // remaining > wart，表示系统时间被调整过
        const remaining = wait - (now - previous);
        // eslint-disable-next-line consistent-this
        context = this;
        args = params;
        if (remaining <= 0 || remaining > wait) {
            if (timeout) {
                clearTimeout(timeout);
                timeout = undefined;
            }
            // 重置previous
            previous = now;
            // 执行函数
            result = func.apply(context, args);
            if (!timeout) context = args = undefined;
        } else if (!timeout && trailing) {
            timeout = window.setTimeout(later, remaining);
        }
        return result;
    };
    throttled.cancel = function () {
        clearTimeout(timeout);
        previous = 0;
        timeout = context = args = undefined;
    };
    return throttled;
};

/**
 * @description 防抖
 * @param func 防抖函数
 * @param wait 等待时长
 * @param options 配置:
 *              leading(true: 立即执行; false: 第一次执行也等待 wait 时间)
 *              trailing(true 延迟结束后调用; false 延迟结束后不调用)
 * @returns {function(): *}
 */
export const debounce = function <T extends Array<any>>(
    func: (...args: T) => any,
    wait: number,
    options: { leading?: boolean; trailing?: boolean } = {},
) {
    const { leading = false, trailing = true } = options;
    let immediate = false;
    let timeout: number | undefined, result: ReturnType<typeof func>;

    // 延迟执行函数
    const later = (context: any, args: T) =>
        window.setTimeout(() => {
            timeout = undefined;
            if (immediate) {
                immediate = false;
                return;
            }
            result = func.apply(context, args);
        }, wait);

    const debounced = function (this: any, ...params: T) {
        if (!timeout) {
            trailing && (timeout = later(this, params));

            if (leading) {
                result = func.apply(this, params);
                immediate = true;
            }
        } else {
            clearTimeout(timeout);
            immediate = false;
            timeout = later(this, params);
        }
        return result;
    };

    debounced.cancel = function () {
        clearTimeout(timeout);
        timeout = undefined;
    };
    return debounced;
};
