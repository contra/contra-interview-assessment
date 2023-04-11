import { FlagType } from '../src/generated/types'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
    await prisma.user.createMany({
        data: [
            { givenName: 'James', familyName: 'Joe', email: 'Jamejoe@test.com' },
            { givenName: 'John', familyName: 'Doe', email: 'joe@test.com' },
            { givenName: 'Captain', familyName: 'Marvel', email: 'cp@marvel.com'}
        ]
    })

    await prisma.featureFlag.createMany({
        data: [
            { flagName: 'premium-user', flagType: FlagType.Boolean },
            { flagName: 'button-color', flagType: FlagType.String },
            { flagName: 'multi-variant', flagType: FlagType.Json}
        ]
    })
    console.log('seed complete')
}

main()
.then( async () => await prisma.$disconnect())
.catch( async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
})