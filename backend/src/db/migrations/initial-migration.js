const fs = require('fs');
const path = require('path');

const up = async (queryInterface) => {
    const upQueryFilePath = path.join(__dirname, '../scripts/create-initial-db-structure.sql');
    const createInitialDatabaseStructureQuery = fs.readFileSync(upQueryFilePath, { encoding: 'utf-8' });

    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');


    await queryInterface.createSchema('Common');
    await queryInterface.sequelize.query(createInitialDatabaseStructureQuery);
};
const down = async (queryInterface) => {
    await queryInterface.dropSchema('Common');
};

// eslint-disable-next-line import/no-commonjs
module.exports = {
    down,
    up,
};
