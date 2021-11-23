import { emptyObj } from '../base';

/**
 * @description 动画滚动
 * @param options { ele: DOM 节点, value: 目标值, duration: 运动时长, direction: 方向 }
 * @param startTime
 * @param startValue
 */
export const animateScrollTo = (
    options: {
        ele?: Element;
        value?: number;
        duration?: number;
        direction?: 'Top' | 'Left';
        onEnded?: () => void;
    },
    startTime?: number,
    startValue?: number,
) => {
    const { ele, value = 0, duration = 150, direction = 'Top', onEnded } = options;
    if (!ele) return;

    const scrollAttr = direction === 'Top' ? 'scrollTop' : 'scrollLeft';
    const scrollSizeAttr = direction === 'Top' ? 'scrollHeight' : 'scrollWidth';
    const clientSizeAttr = direction === 'Top' ? 'clientHeight' : 'clientWidth';

    const _startTime = startTime ?? Date.now();
    const _startValue = startValue ?? ele[scrollAttr];

    requestAnimationFrame(() => {
        const scrollSize = ele[scrollSizeAttr];
        const clientSize = ele[clientSizeAttr];
        const maxScroll = scrollSize - clientSize;
        const minScroll = 0;

        const _value = Math.min(Math.max(value, minScroll), maxScroll);
        const isForward = _value >= _startValue;
        const currentScroll =
            _startValue + ((_value - _startValue) * (Date.now() - _startTime)) / duration;

        const offsetScroll = Math.min(Math.max(currentScroll, minScroll), maxScroll);
        const nextScroll = isForward
            ? Math.min(offsetScroll, _value)
            : Math.max(offsetScroll, _value);

        ele[scrollAttr] = nextScroll;

        nextScroll !== _value
            ? animateScrollTo(options, _startTime, _startValue)
            : requestAnimationFrame(() => onEnded?.());
    });
};

let isDragging = false;

interface Options {
    start?: (e: MouseEvent) => void;
    drag?: (e: MouseEvent) => void;
    end?: (e: MouseEvent) => void;
}

/**
 * @description 拖拽动画
 * @param element
 * @param options
 * @returns
 */
export const draggable = <T extends HTMLElement>(element: T, options: Options = emptyObj) => {
    const moveFn = (event: MouseEvent) => options.drag?.(event);

    const upFn = (event: MouseEvent) => {
        document.removeEventListener('mousemove', moveFn);
        document.removeEventListener('mouseup', upFn);
        document.onselectstart = null;
        document.ondragstart = null;

        isDragging = false;

        options.end?.(event);
    };

    const downFn = (event: MouseEvent) => {
        if (isDragging) return;

        document.onselectstart = function () {
            return false;
        };
        document.ondragstart = function () {
            return false;
        };

        document.addEventListener('mousemove', moveFn);
        document.addEventListener('mouseup', upFn);
        isDragging = true;

        options.start?.(event);
    };

    element.addEventListener('mousedown', downFn);

    return () => element.removeEventListener('mousedown', downFn);
};

interface MouseScrollEvent extends Event {
    wheelDelta?: number;
    detail?: number;
}

/**
 * @description 绑定滚动事件
 * @param el
 * @param callback
 */
export const mouseWheel = <E extends HTMLElement>(
    el: E,
    callback: (e: Event, direction: number) => void,
) => {
    function fn(e: MouseScrollEvent) {
        e = e || window.event;
        //让滚动方向统一 （向上滚动>0、向下滚动<0）
        const direction = (e?.wheelDelta ?? 0) / 120 || -(e?.detail ?? 0) / 3;
        callback.call(el, e, direction);
    }
    //判断是否是火狐浏览器
    const type = (document as any).onmousewheel === null ? 'mousewheel' : 'DOMMouseScroll';
    //判断是否是IE8
    el.addEventListener(type, fn);

    return () => el.removeEventListener(type, fn);
};
