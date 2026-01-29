// Simple RBAC mapping and helpers for local/dev use
import { getSessionUser } from './session'

const USERS = {
  'rob@launchpadphilly.org': { username: 'lpuser1', role: 'STAFF', password: 'lpuser1' },
  'sanaa@launchpadphilly.org': { username: 'lpuser2', role: 'STAFF', password: 'lpuser2' },
  'taheera@launchpadphilly.org': { username: 'lpuser3', role: 'STAFF', password: 'lpuser3' },
  'admin@launchpadphilly.org': { username: 'lpadmin', role: 'ADMIN', password: 'admin' },
  'viewer@launchpadphilly.org': { username: 'lpviewer', role: 'READONLY', password: 'viewer' }
  , 'demouser123@gmail.com': { username: 'demouser123', role: 'STAFF', password: 'lpuser1' }
};

export function lookupUserByEmail(email) {
  if (!email) return null;
  const key = email.trim().toLowerCase();
  return USERS[key] || null;
}

export function verifyCredentials(email, password) {
  const user = lookupUserByEmail(email);
  if (!user) return false;
  return user.password === password;
}

export function roleCanCreate(role) {
  return role === 'STAFF' || role === 'ADMIN';
}

export function roleCanUpdate(role) {
  return role === 'STAFF' || role === 'ADMIN';
}

export function roleCanDelete(role) {
  return role === 'ADMIN';
}

export const ALL_ROLES = ['ADMIN','STAFF','READONLY'];

export default USERS;

// Server-side page protection helper for getServerSideProps
export async function requirePageRole(context, roles = []) {
  try {
    const { req, res } = context
    const user = await getSessionUser(req)
    if (!user) {
      return { redirect: { destination: '/', permanent: false } }
    }
    if (roles.length && !roles.includes(user.role)) {
      return { redirect: { destination: '/', permanent: false } }
    }
    return { props: { user } }
  } catch (e) {
    console.error('requirePageRole error:', e)
    return { redirect: { destination: '/', permanent: false } }
  }
}

// API route protection helper
export async function requireApiRole(req, res, roles = []) {
  // Allow tests to bypass authentication
  if (process.env.NODE_ENV === 'test') {
    return { id: 'test-user', name: 'Test User', email: 'test@example.com', role: 'ADMIN' }
  }
  const user = await getSessionUser(req)
  if (!user) {
    res.status(401).json({ error: 'Unauthorized' })
    return null
  }
  if (roles.length && !roles.includes(user.role)) {
    res.status(403).json({ error: 'Forbidden' })
    return null
  }
  return user
}
