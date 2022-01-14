import test from 'ava';
import { formatPrecision } from './index';

test('math - formatPrecision', t => {
    t.is(formatPrecision(1.2), '1.20');
    t.is(formatPrecision(1.2, { precision: 3 }), '1.200');
    t.is(formatPrecision(1.2, { precision: 3, isStrict: true }), '1.200');
    t.is(formatPrecision(1.2, { precision: 3, isStrict: false }), '1.2');
    t.is(formatPrecision(1.21, { precision: 1 }), '1.2');
});
