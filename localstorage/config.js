// As we are running this on node.js
// It will meet the if condition
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch'); // eslint-disable-line no-native-reassign
}