// It is going to get in the if as we are running this on node.js
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch'); // eslint-disable-line no-native-reassign
}