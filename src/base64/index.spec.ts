import test from 'ava';
import { decode, encode, urlSafeB64Decode, urlSafeB64Encode } from '.';

const enIn = JSON.stringify({
    key: '5156716541',
    url: 'https://www.baidu.com?tips_id=1237794&keys=fe9b3123e4b42aebdc6e93b810d7f3d51336fbfa',
});
const enOut =
    'eyJrZXkiOiI1MTU2NzE2NTQxIiwidXJsIjoiaHR0cHM6Ly93d3cuYmFpZHUuY29tP3RpcHNfaWQ9MTIzNzc5NCZrZXlzPWZlOWIzMTIzZTRiNDJhZWJkYzZlOTNiODEwZDdmM2Q1MTMzNmZiZmEifQ==';

const zhIn = JSON.stringify({
    contentType: 1,
    text: '不小心',
    images: [],
});
const zhOut = 'eyJjb250ZW50VHlwZSI6MSwidGV4dCI6IuS4jeWwj+W/gyIsImltYWdlcyI6W119';

test('base64 - encode', t => {
    t.is(encode(enIn), enOut);
    t.is(encode(zhIn), zhOut);
});

test('base64 - decode', t => {
    t.is(decode(enOut), enIn);
    t.is(decode(zhOut), zhIn);
});

test('base64 - urlSafeB64Encode', t => {
    // t.is(urlSafeB64Encode(enIn), enOut);
    // console.log(urlSafeB64Encode(zhIn));
    t.is(urlSafeB64Encode(zhIn), zhOut.replace(/\+/g, '-').replace(/\//g, '_'));
});

test('base64 - urlSafeB64Decode', t => {
    t.is(urlSafeB64Decode(enOut), enIn);
    t.is(urlSafeB64Decode(zhOut), zhIn);
});
