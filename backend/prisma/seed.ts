/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';
import { FlagType } from '../src/generated/types';

const prisma = new PrismaClient();

(async () => {
  try {
    // Create feature flags and variants
    await prisma.featureFlag.create({
      data: {
        description: 'This feature flag gives high priority to certain users',
        name: 'high_priority',
        type: FlagType.Boolean,
      },
    });

    await prisma.featureFlag.create({
      data: {
        description: 'This feature flag enables dark mode for users',
        name: 'dark_mode',
        type: FlagType.Boolean,
      },
    });

    await prisma.featureFlag.create({
      data: {
        description: 'This feature flag enables multiple variants for users',
        name: 'multi_variant-flag',
        type: FlagType.Multivariant,
      },
    });

    // Create users
    await prisma.user.createMany({
      data: [
        {
          email_address: 'johndoe@example.com',
          family_name: 'Doe',
          given_name: 'John',
        },
        {
          email_address: 'janedoe@example.com',
          family_name: 'Doe',
          given_name: 'Jane',
        },
        {
          email_address: 'johhnydoe@example.com',
          family_name: 'Doe',
          given_name: 'Johhny',
        },
      ],
    });

    console.log('Seeding complete!');
  } catch (error) {
    console.error(error);
  }
})();
