/**
 * @description 获取剩余时间，如 59 分 24 秒
 * @param createDate
 * @param duration
 * @param nowDate
 */
export function getRemainTime(
    createDate: Date | string | number,
    duration: number,
    nowDate?: Date | string | number,
) {
    const startDate = new Date(createDate);
    const endDate = new Date(startDate.getTime() + duration);
    const now = nowDate ? new Date(nowDate) : new Date();
    const deltaTime = endDate.getTime() - now.getTime();
    if (deltaTime <= 0) return { hours: 0, minutes: 0, seconds: 0 };

    // 剩余小时
    const hours = Math.floor(deltaTime / 1000 / 60 / 60);

    // 剩余分钟
    const minutes = Math.floor((deltaTime / 1000 / 60) % 60);

    // 剩余秒
    const seconds = Math.floor((deltaTime / 1000) % 60);

    return { hours, minutes, seconds };
}

/**
 * @description 格式化剩余时间
 * @param time
 */
export function formatRemainTime(time: { hours: number; minutes: number; seconds: number }) {
    const { hours, minutes, seconds } = time;

    const hoursText = hours === 0 ? '' : `${hours}时`;
    const minutesText = minutes === 0 ? '' : `${minutes}分`;
    const secondsText = `${seconds}秒`;

    return hoursText + minutesText + secondsText;
}
console.log(1);
