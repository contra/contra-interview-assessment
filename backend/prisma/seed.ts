import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const main = async () => {
  const featureFlags = prisma.featureFlagSelection.createMany({
    data: [
      {
        name: 'feature1',
        possibleValues: [1, 2, 3, 4],
      },
      {
        name: 'feature2',
        possibleValues: [
          { theme: 'dark', header: 'above' },
          { theme: 'light', header: 'above' },
        ],
      },
    ],
  });
  const users = prisma.user.createMany({
    data: [
      {
        email: 'luke@star.com',
        firstName: 'Luke',
        familyName: 'Skywalker',
      },
      {
        email: 'leia@star.com',
        firstName: 'Leia',
        familyName: 'Organa',
      },
    ],
  });
  await prisma.$transaction([featureFlags, users]);
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
