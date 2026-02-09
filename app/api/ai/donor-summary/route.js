export async function POST(req) {
  try {
    const body = await req.json();
    const donors = body.donors || [];
    const clientContext = body.client || {};

    if (!Array.isArray(donors) || donors.length === 0) {
      return new Response(JSON.stringify({ error: 'Please provide a non-empty `donors` array in the request body.' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const systemPrompt = `You are an expert fundraising advisor. Given a list of donors and optional client context, produce a JSON object with three keys: ` +
      `"recommendations" (actionable next steps for working with the client), ` +
      `"insights" (high-level patterns and observations), and ` +
      `"donors" (an array summarizing each donor's past donations and engagement with suggested outreach). ` +
      `Be concise, prioritize practical steps, and output VALID JSON only.`;

    const userPrompt = `Client context:\n${JSON.stringify(clientContext)}\n\nDonors:\n${JSON.stringify(donors)}\n\nReturn the requested JSON structure. For each donor include: name, totalDonations, donationCount, lastDonation, shortSummary (1-2 sentences), and suggestedNextAction.`;

    if (!process.env.OPENAI_API_KEY) {
      return new Response(JSON.stringify({ error: 'Server misconfiguration: OPENAI_API_KEY not set.' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2,
        max_tokens: 1000,
      }),
    });

    if (!openaiRes.ok) {
      const errText = await openaiRes.text();
      return new Response(JSON.stringify({ error: 'OpenAI request failed', details: errText }), { status: 502, headers: { 'Content-Type': 'application/json' } });
    }

    const openaiJson = await openaiRes.json();
    const text = openaiJson?.choices?.[0]?.message?.content || '';

    // Try to parse model output as JSON. If parsing fails, return raw text under `raw`.
    try {
      const parsed = JSON.parse(text);
      return new Response(JSON.stringify(parsed), { status: 200, headers: { 'Content-Type': 'application/json' } });
    } catch (e) {
      return new Response(JSON.stringify({ raw: text }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
