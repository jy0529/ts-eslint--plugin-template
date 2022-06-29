const semver = require('semver');
const pkg = require('./package.json');
const supportedNodeVersion = semver.minVersion(pkg.engines.node).version;

module.exports = {
  presets: [
    '@babel/preset-typescript',
    ['@babel/preset-env', { targets: { node: supportedNodeVersion } }],
  ],
  ignore: ['src/**/__tests__/fixtures/**'],
};
