// OpenAI integration removed. This file kept as a harmless fallback to avoid runtime errors.
export async function generateNotificationMessage({ name, type /*, lastDonation */ }) {
  // Return a safe, static message without calling any external service.
  if (type === 'new') return `Hey ${name}, thank you for the donation — we appreciate your support.`;
  return `Hey ${name}, we missed this month's donation 😢 — here's an opportunity to donate now.`;
}
