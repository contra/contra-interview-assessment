'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('FeatureFlag', [
      {
        id: '01ff166b-c14d-4c26-b431-1664eb67df63',
        name: 'Payment provider',
        value: 'Stripe',
        description: 'Stripe',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        id: '2769277a-94af-463b-aa17-b626d623bcfa',
        name: 'Payment provider',
        value: 'Paypal',
        description: 'Paypal',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        id: 'cf02b3aa-aae6-4b76-85c9-b088344d6c9f',
        name: 'Discount',
        value: '0.1',
        description: 'Discount for regular users',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        id: '2a150b93-c331-4e5f-a008-74e8f5614776',
        name: 'Discount',
        value: '0.4',
        description: 'Discount for new users',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        id: 'f09c1fb2-9599-406c-a486-29f08a5ac951',
        name: 'API Version',
        value: '2',
        description: 'API Version 2',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        id: '23646627-cb6b-42da-8074-4dd01dd7ae4d',
        name: 'API Version',
        value: '3',
        description: 'API Version 3',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        id: '4e12eac2-7c5f-473d-acaa-f35d34fb3bd2',
        name: 'Payment provider',
        value: 'Wise',
        description: 'Stripe',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        id: 'a568921d-b416-4899-9e75-8b466bcf0a49',
        name: 'Payment provider',
        value: 'MercadoPago',
        description: 'MercadoPago',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('FeatureFlag', null, {});
  },
};
