import test from 'ava';
import { remove, removeFaster } from './index';

test('array - remove', t => {
    const arr = [10, 11, 12];
    remove(arr, 10);
    removeFaster(arr, 11);
    t.is(1, 1);
});
