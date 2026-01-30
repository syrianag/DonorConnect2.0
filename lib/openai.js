// Server-side OpenAI helper — reads API key from process.env.OPENAI_API_KEY
// Do NOT commit your API key. Set it in your environment (e.g. .env.local).
export async function generateNotificationMessage({ name, type, lastDonation }) {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    // Fallback messages when no key is available
    if (type === 'new') return `Hey ${name}, thank you for the donation — we appreciate your support.`;
    return `Hey ${name}, we missed this month's donation 😢 — here's an opportunity to donate now.`;
  }

  const system = `You are a friendly assistant that writes short, concise, and warm donation notifications. Keep messages under 40 words, address the donor by name, and use a single emoji for tone when appropriate.`;
  let userPrompt = '';
  if (type === 'new') {
    userPrompt = `Write a short friendly thank-you message addressed to ${name} for their first donation. Keep it under 25 words.`;
  } else {
    const when = lastDonation ? ` Their last donation was on ${lastDonation}.` : '';
    userPrompt = `Write a short friendly reminder to ${name} noting we missed this month's recurring donation.${when} Include a sad face emoji and a brief call-to-action to donate now (under 30 words).`;
  }

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: system },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 120,
        temperature: 0.6,
      }),
    });

    if (!res.ok) {
      const txt = await res.text();
      console.error('OpenAI error', res.status, txt);
      // fallback
      if (type === 'new') return `Hey ${name}, thank you for the donation — we appreciate your support.`;
      return `Hey ${name}, we missed this month's donation 😢 — here's an opportunity to donate now.`;
    }

    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    if (content) return content.trim();

    // fallback
    if (type === 'new') return `Hey ${name}, thank you for the donation — we appreciate your support.`;
    return `Hey ${name}, we missed this month's donation 😢 — here's an opportunity to donate now.`;
  } catch (err) {
    console.error('OpenAI request failed', err);
    if (type === 'new') return `Hey ${name}, thank you for the donation — we appreciate your support.`;
    return `Hey ${name}, we missed this month's donation 😢 — here's an opportunity to donate now.`;
  }
}
