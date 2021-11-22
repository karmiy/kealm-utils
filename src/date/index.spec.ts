import test from 'ava';
import { formatRemainTime, getRemainTime } from './index';

test('date - remain', t => {
    const now = Date.now();
    const remainTime = getRemainTime(now, 1000 * 60 * 5, now + 1000 * 60 * 4);
    t.deepEqual(remainTime, { hours: 0, minutes: 1, seconds: 0 });

    t.is(formatRemainTime(remainTime), '1分0秒');
});
