'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserFeatureFlag', [
      {
        userId: '4c28f8cb-0dfb-4047-b064-ad100f22a967',
        featureFlagId: '2769277a-94af-463b-aa17-b626d623bcfa',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        userId: '0f42e43f-0566-45f2-9ce9-be3e10b62f9e',
        featureFlagId: '2769277a-94af-463b-aa17-b626d623bcfa',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        userId: 'bcd76b0b-5ccd-4f5a-8809-08f152aeb199',
        featureFlagId: 'f09c1fb2-9599-406c-a486-29f08a5ac951',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        userId: '6e187cc2-2ef1-467a-8540-7d27e2dc99ba',
        featureFlagId: 'f09c1fb2-9599-406c-a486-29f08a5ac951',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        userId: 'e100952d-a853-460b-b192-0934b0452f63',
        featureFlagId: 'f09c1fb2-9599-406c-a486-29f08a5ac951',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        userId: 'b9f46fae-81a3-4c1c-99a6-ce1ca996570a',
        featureFlagId: 'f09c1fb2-9599-406c-a486-29f08a5ac951',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserFeatureFlag', null, {});
  },
};
