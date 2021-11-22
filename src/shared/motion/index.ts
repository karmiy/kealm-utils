/**
 * @description 动画滚动
 * @param options { ele: DOM 节点, value: 目标值, duration: 运动时长, direction: 方向 }
 * @param startTime
 * @param startValue
 */
export function animateScrollTo(
    options: {
        ele?: Element;
        value?: number;
        duration?: number;
        direction?: 'Top' | 'Left';
        onEnded?: () => void;
    },
    startTime?: number,
    startValue?: number,
) {
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
}
