import { generateNotificationMessage } from '../../../lib/openai';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, type, lastDonation } = body || {};
    if (!name || !type) {
      return new Response(JSON.stringify({ error: 'missing name or type' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const message = await generateNotificationMessage({ name, type, lastDonation });
    return new Response(JSON.stringify({ message }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('notifications route error', err);
    return new Response(JSON.stringify({ error: 'server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
