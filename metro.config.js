const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Force Metro to ignore the backend folder completely
config.resolver.blacklistRE = [
  /backend\/.*/,
  /node_modules\/.*\/node_modules\/react\/.*/
];

module.exports = config;