import test from 'ava';
import { matchVersion, parseVersion } from './index';

test('validation - parseVersion', t => {
    t.is(parseVersion('7.9.10'), 70910);
});

test('validation - matchVersion', t => {
    t.truthy(matchVersion('7.9.10', 'eq', '7.9.10'));
    t.truthy(matchVersion('7.9.10', 'ge', '7.9.10'));
    t.truthy(matchVersion('7.9.10', 'gt', '7.9.9'));
    t.falsy(matchVersion('7.9.10', 'le', '7.9.9'));
    t.falsy(matchVersion('7.9.10', 'lt', '7.9.9'));
    t.truthy(matchVersion('7.9.10', 'ne', '7.9.9'));
});
