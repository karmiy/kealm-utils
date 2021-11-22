import test from 'ava';
import { queryParse, queryStringify } from './index';

test('query - queryParse', t => {
    t.deepEqual(queryParse('a=1&b=12'), { a: '1', b: '12' });
});

test('query - queryStringify', t => {
    t.deepEqual(queryStringify({ a: '1', b: '12' }), 'a=1&b=12');
});
