/**
 * @description 为 await 后的 promise 进行处理，返回 [data, err];
 * @param promise
 */
export const asyncWrapper = <T>(promise: Promise<T>) => {
    return promise
        .then(data => [data, null] as [T, null])
        .catch(err => [null, { res: err }] as [null, { res: any }]);
};

/**
 * @description mock 时模拟延时的 Promise
 * @param duration 时长，默认 1s
 */
export const sleep = (duration = 1000) => new Promise(r => setTimeout(r, duration));
