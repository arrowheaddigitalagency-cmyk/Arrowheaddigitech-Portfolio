import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]!));

export async function POST(request: NextRequest) {
  if (Number(request.headers.get('content-length') || 0) > 16000) return NextResponse.json({ message: 'Request too large.' }, { status: 413 });
  let body: Record<string, unknown>;
  try {
    const raw = await request.text();
    if (raw.length > 16000) return NextResponse.json({ message: 'Request too large.' }, { status: 413 });
    body = JSON.parse(raw);
    if (!body || typeof body !== 'object' || Array.isArray(body)) throw new Error('Invalid body');
  } catch { return NextResponse.json({ message: 'Invalid request.' }, { status: 400 }); }
  if (body.website) return NextResponse.json({ success: true });
  const limits: Record<string, number> = { name: 100, email: 254, phone: 40, service: 150, budget: 100, message: 5000 };
  const fields: Record<string, string> = {};
  for (const [key, limit] of Object.entries(limits)) {
    if (body[key] !== undefined && typeof body[key] !== 'string') return NextResponse.json({ message: 'Invalid field.' }, { status: 400 });
    const value = ((body[key] as string) || '').trim();
    if (value.length > limit) return NextResponse.json({ message: 'Field exceeds limit.' }, { status: 400 });
    fields[key] = value;
  }
  if (!fields.name || !fields.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return NextResponse.json({ message: 'A name, valid email and project brief are required.' }, { status: 400 });
  if (!process.env.RESEND_API_KEY) return NextResponse.json({ message: 'Email delivery is not configured. Please contact info@arrowheaddigitech.com.' }, { status: 503 });
  const safe = Object.fromEntries(Object.entries(fields).map(([key, value]) => [key, escapeHtml(value)]));
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const result = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL || 'Arrowhead DigiTech <noreply@arrowheaddigitech-portfolio.com>',
      to: process.env.CONTACT_TO_EMAIL || 'arrowhead.digital.agency@gmail.com',
      replyTo: fields.email,
      subject: 'New digital product inquiry — Arrowhead DigiTech',
      html: `<h2>New project inquiry</h2>${Object.entries(safe).map(([key, value]) => `<p><strong>${key}:</strong><br/>${value.replaceAll('\n', '<br/>')}</p>`).join('')}`,
    });
    if (result.error) return NextResponse.json({ message: 'Email delivery failed. Please try again.' }, { status: 502 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ message: 'Email delivery failed. Please try again.' }, { status: 502 });
  }
}
