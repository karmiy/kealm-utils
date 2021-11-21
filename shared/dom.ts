import { isEmpty } from './validation';

/**
 * @description 阻止页面滚动
 * @param el 滚动元素
 */
export const preventPageScroll = (el?: HTMLElement | string) => {
    const ele = typeof el === 'string' ? (document.querySelector(el) as HTMLElement) : el;

    const prevTop =
            document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop,
        body = document.body;

    // 原本的 style
    const prevPagePosition = body.style.position;
    const prevPageWidth = body.style.width;
    const prevPageHeight = body.style.height;
    const prevPageTop = body.style.top;
    const prevPageLeft = body.style.left;
    const prevOverflow = ele?.style.overflow;

    // 滚动元素非 body 也需要，防止 IOS 橡皮筋
    // alert(height);
    body.style.position = 'fixed';
    body.style.width = '100%';
    body.style.height = parseFloat(getComputedStyle(body).height) - 1 + 'px'; // 6PLUS IOS 12 遇到问题，不设置一个小于屏幕的高度，页面上 fixed 元素会错位？
    body.style.top = `${-prevTop}px`;
    body.style.left = '0';

    // 普通元素只需超出 hidden
    ele && (ele.style.overflow = 'hidden');

    return () => {
        const top = Math.abs(parseFloat(body.style.top));
        !isEmpty(prevPagePosition) && (body.style.position = prevPagePosition);
        !isEmpty(prevPageWidth) && (body.style.width = prevPageWidth);
        !isEmpty(prevPageHeight) && (body.style.height = prevPageHeight);
        !isEmpty(prevPageTop) && (body.style.top = prevPageTop);
        !isEmpty(prevPageLeft) && (body.style.left = prevPageLeft);
        !isEmpty(prevOverflow) && ele && (ele.style.overflow = prevOverflow);

        document.documentElement.scrollTop = top;
        window.scrollTo(0, top);
    };
};
