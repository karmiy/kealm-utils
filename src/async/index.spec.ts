import test from 'ava';
import { asyncWrapper, sleep } from './index';

const getUserInfo = async () => {
    await sleep();

    return { id: 1 };
};

test('async - asyncWrapper', async t => {
    const [data, err] = await asyncWrapper(getUserInfo());

    if (err || !data) return t.fail();

    t.deepEqual(data, { id: 1 });
});
