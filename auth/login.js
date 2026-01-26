import bcrypt from 'bcryptjs'
import prisma from '../../../lib/prisma'
import { createSession } from '../../../lib/session'

export default async function handler(req, res) {
  // CORS / preflight support: some deployments or setups issue an OPTIONS
  // preflight before POST. Respond to OPTIONS so clients won't receive 405.
  const origin = req.headers.origin || '*'
  res.setHeader('Access-Control-Allow-Origin', origin)
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  // If you need cookies across origins, you'll also need to set:
  // res.setHeader('Access-Control-Allow-Credentials', 'true')
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST, OPTIONS')
    console.warn('/api/auth/login - invalid method', req.method)
    res.status(405).end()
    return
  }

  const { email, password } = req.body || {}
  if (!email || !password) {
    res.status(400).json({ error: 'email and password are required' })
    return
  }
  const user = await prisma.user.findUnique({ where: { email: email.toLowerCase() } })
  if (!user) {
    res.status(401).json({ error: 'Invalid credentials' })
    return
  }

  const ok = await bcrypt.compare(password, user.password)
  if (!ok) {
    res.status(401).json({ error: 'Invalid credentials' })
    return
  }

  await createSession(res, { id: user.id, name: `${user.firstName} ${user.lastName}`.trim(), email: user.email, role: user.role })
  res.status(200).json({ user: { id: user.id, name: `${user.firstName} ${user.lastName}`.trim(), email: user.email, role: user.role } })
}