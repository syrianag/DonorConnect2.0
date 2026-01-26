import { PrismaClient } from '@prisma/client';

// Create a PrismaClient that connects directly to the DATABASE_URL (Neon Postgres).
// We pass a `datasources` override so PrismaClient uses the provided connection at runtime.
const prisma = global.__prismaClient || new PrismaClient({
	datasources: {
		db: {
			url: process.env.DATABASE_URL,
		},
	},
});

if (process.env.NODE_ENV !== 'production') global.__prismaClient = prisma;

export default prisma;
