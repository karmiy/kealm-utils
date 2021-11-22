/**
 * @description 解析 url query，string => object
 * @param search 要解析的的 querystring，例如：a=1&b=hello&c=true
 */
export const queryParse = (search?: string): Record<string, string> => {
    if (!search && typeof window === 'object') {
        search = window.location.search.slice(1);
    }
    if (typeof search !== 'string' || !search.length) {
        return {};
    }

    const kvs = search.split('&');
    return kvs.reduce(function (qu: Record<string, string>, it) {
        const kv = it.split('=');
        const kv0 = decodeURIComponent(kv[0]);
        const kv1 = decodeURIComponent(kv[1]);

        // 注意: 如出现重复的 key，后者的值会覆盖前者的值
        qu[kv0] = kv1;
        return qu;
    }, {});
};

/**
 * @description url query，object => string
 * @param obj 要 query 化的对象
 */
export function queryStringify(obj?: Record<string, string>): string {
    if (typeof obj !== 'object') {
        return '';
    }

    let k: string;
    const kvs: string[] = [];
    for (k in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, k)) {
            kvs.push(encodeURIComponent(k) + '=' + encodeURIComponent(obj[k]));
        }
    }

    return kvs.length ? kvs.join('&') : '';
}
