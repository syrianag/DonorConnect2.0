// Minimal server-side session helper for getServerSideProps / API routes
// Looks for a `dc_user` cookie (stored by the client-side demo auth) and returns the parsed user object.

export async function getSessionUser(req) {
  try {
    if (!req || !req.headers) return null;
    const cookie = req.headers.cookie || '';
    const match = cookie.split(';').map(s=>s.trim()).find(s=>s.startsWith('dc_user='));
    if (!match) return null;
    const raw = match.replace('dc_user=', '');
    try {
      const decoded = decodeURIComponent(raw);
      return JSON.parse(decoded);
    } catch (e) {
      return null;
    }
  } catch (e) {
    return null;
  }
}

export default getSessionUser;
