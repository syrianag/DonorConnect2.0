export async function POST(req) {
  try {
    const body = await req.json();
    const { name, type } = body || {};
    if (!name || !type) {
      return new Response(JSON.stringify({ error: 'missing name or type' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    // OpenAI integration removed; return local fallback messages.
    const message = type === 'new'
      ? `Hey ${name}, thank you for the donation — we appreciate your support.`
      : `Hey ${name}, we missed this month's donation 😢 — here's an opportunity to donate now.`;

    return new Response(JSON.stringify({ message }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('notifications route error', err);
    return new Response(JSON.stringify({ error: 'server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
