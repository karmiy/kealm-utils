import test from 'ava';
import {
    isArray,
    isBoolean,
    isEmpty,
    isFunction,
    isIdCard,
    isInteger,
    isNumber,
    isObject,
    isPlainObject,
    isPromise,
    isString,
    isTelephone,
} from './index';

test('validation - isBoolean', t => {
    t.truthy(isBoolean(true));
});

test('validation - isString', t => {
    t.truthy(isString('true'));
});

test('validation - isObject', t => {
    t.truthy(isObject({ id: 1 }));
});

test('validation - isNumber', t => {
    t.truthy(isNumber(100));
});

test('validation - isArray', t => {
    t.truthy(isArray([100]));
});

test('validation - isFunction', t => {
    t.truthy(isFunction(() => 100));
});

test('validation - isPromise', t => {
    t.truthy(isPromise(Promise.resolve()));
});

test('validation - isInteger', t => {
    t.truthy(isInteger(100));
});

test('validation - isEmpty', t => {
    t.truthy(isEmpty(null));
    t.truthy(isEmpty(undefined));
    t.falsy(isEmpty(1));
});

test('validation - isPlainObject', t => {
    class A {}
    class B extends A {}
    t.truthy(isPlainObject({ id: 1 }));
    t.truthy(isPlainObject(Object.create(null)));
    t.falsy(isPlainObject(new B()));
});

test('validation - isTelephone', t => {
    t.truthy(isTelephone('15160033956'));
    t.falsy(isTelephone('1516003395'));
});

test('validation - isIdCard', t => {
    t.truthy(isIdCard('440102198001021230'));
    t.falsy(isIdCard('440102198791021230'));
});
