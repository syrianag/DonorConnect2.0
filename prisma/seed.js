const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const donor = await prisma.donor.create({
    data: { name: 'Alice Example', email: 'alice@example.com' }
  });

  const campaign = await prisma.campaign.create({
    data: { name: 'General Fund', goal: 10000, raised: 0, status: 'active' }
  });

  await prisma.donation.create({
    data: { amount: 250, donorId: donor.id, campaignId: campaign.id }
  });

  await prisma.staffUser.create({
    data: { email: 'staff@example.com', password: 'changeme', role: 'admin' }
  });

  console.log('Seed data created.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
