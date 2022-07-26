/* eslint-disable canonical/filename-match-exported */
/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import 'variables.scss';`
  },
};

module.exports = nextConfig;
