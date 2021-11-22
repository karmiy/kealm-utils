import { isEmpty } from '../validation';

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

/**
 * @description 通过 class 查询父级 DOM 元素
 * @param dom 被查找 DOM元素
 * @param className 父元素类名
 * @param self 查找时是否包含元素本身
 */
export const getParentNodeByClass = (
    dom: HTMLElement,
    className: string,
    self = true,
): HTMLElement | null => {
    if (self && dom.classList.contains(className)) {
        return dom;
    }
    const parentNode = dom.parentNode as HTMLElement | null;

    if (!parentNode || parentNode === document.documentElement) {
        return null;
    }

    return parentNode.classList.contains(className)
        ? parentNode
        : getParentNodeByClass(parentNode, className, false);
};

/**
 * @description 根据类名查询某一子节点
 * @param ele
 * @param className
 */
export const getChildrenNodeByClass = (ele?: Element, className?: string) => {
    if (!ele || !className) return null;

    return Array.from(ele.children).find(node => node.classList.contains(className)) ?? null;
};

/**
 * @description 根据类名得到某一侧的兄弟节点
 * @param ele
 * @param className
 * @param type
 */
export const getAsideSiblingNodeByClass = (
    ele: Element,
    className: string,
    type: 'prev' | 'next',
): Element | null => {
    const _ele = type === 'prev' ? ele.previousElementSibling : ele.nextElementSibling;
    if (!_ele) return null;

    return _ele.classList.contains(className)
        ? _ele
        : getAsideSiblingNodeByClass(_ele, className, type);
};

/**
 * @description 根据类名查询兄弟节点
 * @param ele
 * @param className
 */
export const getSiblingNodeByClass = (ele?: Element, className?: string) => {
    if (!ele || !className) return null;

    const prevEle = getAsideSiblingNodeByClass(ele, className, 'prev');
    if (prevEle) return prevEle;

    const nextEle = getAsideSiblingNodeByClass(ele, className, 'next');
    if (nextEle) return nextEle;

    return null;
};

/**
 * 是否是滚动元素
 * @param target
 * @param isStrict 是否严格判断，严格模式下 display: none 隐藏的元素不包括
 */
export const isScrollTarget = (target: HTMLElement, isStrict = false) => {
    const overflowY = getComputedStyle(target).overflowY;

    const isOverflowScroll = overflowY === 'auto' || overflowY === 'scroll';
    const isContentScroll = target.scrollHeight > target.clientHeight;

    if (!isStrict) return isOverflowScroll;
    return isOverflowScroll && isContentScroll;
};

/**
 * 获取滚动父级 DOM
 * @param target
 * @param isStrict
 * @param comparator 自定义比较器
 */
export const getScrollParent = (target: HTMLElement, isStrict = false): HTMLElement | null => {
    const parent = target.parentNode;

    if (!parent || parent === document) return null;

    const _parent = parent as HTMLElement;

    const result = isScrollTarget(_parent, isStrict);

    return result ? _parent : getScrollParent(_parent, isStrict);
};
