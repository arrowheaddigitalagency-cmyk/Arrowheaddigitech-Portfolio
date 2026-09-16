import assert from 'node:assert/strict';
import { NextRequest } from 'next/server';
import { POST } from '../src/app/api/contact/route';

// Never send a live email during these checks.
delete process.env.RESEND_API_KEY;
const request = (body: unknown) => new NextRequest('http://localhost/api/contact', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
const valid = { name: 'Preview Test', email: 'preview@example.com', message: 'A local test that must not send email.' };
assert.equal((await POST(request({}))).status, 400);
assert.equal((await POST(request(null))).status, 400);
assert.equal((await POST(request({ ...valid, email: 'invalid' }))).status, 400);
assert.equal((await POST(request({ ...valid, name: 123 }))).status, 400);
assert.equal((await POST(request({ ...valid, message: 'x'.repeat(5001) }))).status, 400);
assert.equal((await POST(request({ ...valid, message: 'x'.repeat(17000) }))).status, 413);
assert.equal((await POST(request({ ...valid, website: 'spam.invalid' }))).status, 200);
assert.equal((await POST(request(valid))).status, 503);
console.log('8 contact validation checks passed. No email was sent.');
