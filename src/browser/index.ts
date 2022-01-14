const UA = window.navigator.userAgent;

export const isAndroid = /Android/i.test(UA);
export const isiOS = /iPhone|iPad|iPod/i.test(UA);
export const isWeChat = /MicroMessenger/i.test(UA);
export const isQQ = isiOS
    ? /QQ|Qzone/i.test(UA) && !/MQQBrowser/i.test(UA)
    : /MQQBrowser/i.test(UA);
export const isZhiHu = /zhihu/i.test(UA);
export const isWeiBo = /weibo/i.test(UA);
export const isAliApp = /AliApp/i.test(UA);

const iOSMatch = UA.match(/OS (\d+)_(\d+)_?(\d+)?/i);
export const iOSVersion = iOSMatch ? parseInt(iOSMatch[1], 10) : 0;

const SCREEN_WIDTH = window.screen && window.screen.width ? window.screen.width : 0;
const SCREEN_HEIGHT = window.screen && window.screen.height ? window.screen.height : 0;

/**
 * @description 是否 iPhoneX 系列
 */
export const isIPhoneXSeries = () => {
    if (!isiOS) return false;

    const { width, height } = screen;

    const OPTIONS = [
        { width: 375, height: 812, devicePixelRatio: 3 },
        { width: 414, height: 896, devicePixelRatio: 3 },
        { width: 414, height: 896, devicePixelRatio: 2 },
        { width: 390, height: 844, devicePixelRatio: 3 }, // 12pro
        { width: 428, height: 926, devicePixelRatio: 3 }, // 12pro max
    ];

    return !!OPTIONS.find(
        item =>
            item.width === width &&
            item.height === height &&
            item.devicePixelRatio === window.devicePixelRatio,
    );
};

/**
 * @description 是否 iPhoneX
 * - iPhone X
 * - iPhone XS
 * - iPhone 11 Pro
 * - iPhone 12 Mini
 */
export function isIPhoneX(): boolean {
    return isiOS && SCREEN_HEIGHT === 812 && SCREEN_WIDTH === 375;
}

/**
 * @description 是否 iPhoneX Max
 * - iPhone 11
 * - iPhone XR
 * - iPhone XS Max
 * - iPhone 11 Pro Max
 */
export const isIPhoneXMax = () => {
    return isiOS && SCREEN_HEIGHT === 896 && SCREEN_WIDTH === 414;
};

/**
 * @description 是否 iPhone12
 */
export const isIPhone12 = () => {
    return isiOS && SCREEN_WIDTH === 390 && SCREEN_HEIGHT === 844;
};

/**
 * @description 是否 iPhone12 Pro
 */
export const isIPhone12Pro = () => {
    return isiOS && SCREEN_WIDTH === 390 && SCREEN_HEIGHT === 844;
};

/**
 * @description 是否 iPhone12 Pro Max
 */
export const isIPhone12ProMax = () => {
    return isiOS && SCREEN_WIDTH === 428 && SCREEN_HEIGHT === 926;
};

/**
 * @description 是否 iPhone 4/5/5s/SE
 */
export const isIPhone5 = () => {
    return SCREEN_HEIGHT === 568 && SCREEN_WIDTH === 320;
};

/**
 * @description 是否 iPhone 6/6s/6p/6sp/7/8
 */
export const isIPhone6x = () => {
    return isiOS && SCREEN_HEIGHT === 667 && SCREEN_WIDTH === 375;
};

/**
 * @description 是否 iPhone 7/8 Plus
 */
export const isIPhonePlus = () => {
    return isiOS && SCREEN_HEIGHT === 736 && SCREEN_WIDTH === 414;
};

/**
 * @description 是否小米8
 */
export const isXiaoMi8 = () => {
    return SCREEN_HEIGHT === 771 && SCREEN_WIDTH === 393;
};

/**
 * @description 是否 OPPO R17
 */
export const isOppoR17 = () => {
    return SCREEN_HEIGHT === 780 && SCREEN_WIDTH === 360;
};

const NOTCH_CONFIG = [
    {
        w: 375, // X
        h: 812,
    },
    {
        w: 414, // XR
        h: 896,
    },
    {
        w: 390, // 12pro
        h: 844,
    },
    {
        w: 428, // 12pro max
        h: 926,
    },
];

/**
 * @description 刘海屏
 */
export const isNotch = () => {
    const windowWidth = window.screen.width;
    const windowHeight = window.screen.height;

    const isiOSFullScreen =
        NOTCH_CONFIG.findIndex(item => item.w === windowWidth && item.h === windowHeight) > -1;
    const isA = windowHeight / windowWidth > 1.96;
    return isiOSFullScreen || isA;
};
