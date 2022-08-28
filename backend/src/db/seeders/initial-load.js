const fs = require('fs');
const path = require('path');

const up = async (queryInterface) => {
    const usersFilePath = path.join(__dirname, './data/add-users.json');
    const users = JSON.parse(fs.readFileSync(usersFilePath, { encoding: 'utf-8' }));

    const featureFlagPath = path.join(__dirname, './data/add-feature-flags.json');
    const featureFlags = JSON.parse(fs.readFileSync(featureFlagPath, { encoding: 'utf-8' }));


    await queryInterface.bulkInsert({ schema: 'common', tableName: 'User' }, users);
    await queryInterface.bulkInsert({ schema: 'common', tableName: 'FeatureFlag' }, featureFlags);
};

const down = async (queryInterface) => {
    await queryInterface.bulkDelete({ schema: 'common', tableName: 'UserFeatureFlag' }, null, {});
    await queryInterface.bulkDelete({ schema: 'common', tableName: 'User'}, null, {});
    await queryInterface.bulkDelete({ schema: 'common', tableName: 'FeatureFlag' }, null, {});

};

// eslint-disable-next-line import/no-commonjs
module.exports = {
    down,
    up,
};
