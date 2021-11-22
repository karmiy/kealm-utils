import test from 'ava';
import { classnames, unitToPx } from './index';

test.before(() => {
    document.documentElement.style.fontSize = '16px';
});

test('style - classnames', t => {
    t.is(classnames('km-input', { 'is-focus': true, 'is-blur': false }), 'km-input is-focus');
});

test('style - unitToPx', t => {
    // 1024 * 768
    t.is(unitToPx('10rem'), 160);
    t.is(unitToPx('100px'), 100);
    t.is(unitToPx('50vw'), 1024 / 2);
    t.is(unitToPx('50vh'), 768 / 2);
});
