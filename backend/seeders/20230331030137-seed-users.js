'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('User', [
      {
        id: 'bcd76b0b-5ccd-4f5a-8809-08f152aeb199',
        name: 'Some Name',
        email: 'email.com',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        id: '6e187cc2-2ef1-467a-8540-7d27e2dc99ba',
        name: 'Lewis',
        email: 'lewis@email.com',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        id: 'e100952d-a853-460b-b192-0934b0452f63',
        name: 'Kimberly Bailey',
        email: 'murphy.roscoe@gmail.com',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        id: 'b9f46fae-81a3-4c1c-99a6-ce1ca996570a',
        name: 'Melissa Carter',
        email: 'qhartmann@yahoo.com',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        id: 'e012b2e7-e5e6-4bd6-ad24-54a88e7dbf17',
        name: 'Thomas Gray',
        email: 'xleffler@gmail.com',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        id: '6e1827ce-e803-42b4-8fe4-4a53320f84d0',
        name: 'Kyrie Mitchell',
        email: 'ward.catalina@hotmail.com',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        id: '4c28f8cb-0dfb-4047-b064-ad100f22a967',
        name: 'Jackson Richardson',
        email: 'kenya.marvin@gmail.com',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        id: '0f42e43f-0566-45f2-9ce9-be3e10b62f9e',
        name: 'Kade Martin',
        email: 'wcruickshank@gmail.com',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        id: '6f794354-f692-4f2c-b2c8-8245243b4f01',
        name: 'Sabrina Walker',
        email: 'cristian.windler@bernier.net',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        id: 'e6d32cda-7a21-4d09-af98-077a79631a5c',
        name: 'Bryce Phillips',
        email: 'krystel.kulas@hagenes.com',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        id: '4d5b9f1a-b3ed-4cac-9203-18c0dbc55292',
        name: 'Kylie Douglas',
        email: 'hertha91@turcotte.com',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      {
        id: 'e1be20ba-3e3f-4266-bff4-7bdbda3f4579',
        name: 'Rose Wright',
        email: 'lang.brianne@bashirian.com',
        createdDate: new Date(),
        updatedDate: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', null, {});
  },
};
