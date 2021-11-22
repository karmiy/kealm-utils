/**
 * @description 解析版本号，7.9.8 => 70908
 * @param version
 * @returns
 */
export const parseVersion = (version: string) => {
    return version
        .split('.')
        .reverse()
        .reduce((prev, cur, index) => prev + +cur * Math.pow(100, index), 0);
};

export type Operator = 'eq' | 'ne' | 'gt' | 'lt' | 'ge' | 'le';

/**
 * @description 比较版本
 * @param version
 * @param operator
 * @param otherVersion
 * @returns
 */
export const matchVersion = (version?: string, operator?: Operator, otherVersion?: string) => {
    // 有一个没有视为 false，本地浏览器开发会没有 query.v 除非自己带
    if (!version || !operator || !otherVersion) return false;

    const left = parseVersion(version);
    const right = parseVersion(otherVersion);

    switch (operator) {
        case 'eq':
            return left === right;
        case 'ne':
            return left !== right;
        case 'gt':
            return left > right;
        case 'lt':
            return left < right;
        case 'ge':
            return left >= right;
        case 'le':
            return left <= right;
        default:
            return false;
    }
};
