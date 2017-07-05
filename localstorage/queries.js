// Le fake model based on a localstorage

const KEY_NAME = 'listShortened';
require('./config');

/**
 * @private
 * Overrides list of urls
 * @params [array] list
 */
function saveListToStorage(list) {
  localStorage.setItem(KEY_NAME, JSON.stringify(list));
}

/**
 * Gets all the stored urls
 * @returns [array]
 */
exports.getListStored = () => {
  const list = JSON.parse(localStorage.getItem(KEY_NAME));

  return list || [];
}

/**
 * @private
 * Iterates through all urls stored and retrieves the highest id + 1
 * @returns [number]
 */
exports.getLastStoredUniqId = () => {
  const listStored = exports.getListStored();

  // If we have a list return the last element's id + 1
  if (listStored.length) {
    return Number(listStored[listStored.length - 1].id) + 1
  }

  // Reduce to find that amazing item with the highest id num
  // Not completely bullet proof. Just for prototyping purposes
  const highestId = listStored.reduce((sum, url) => {
    const idNum = Number(url.id);
    // Return the highest id, now or the accum ?
    return Math.max(idNum, sum);
  }, 0);

  return highestId + 1;
}

/**
 * Creates a shorten url object and adds it to storage
 * @params [object] urlObject
 */
exports.addUrlObjToStorage = (urlObject) => {
  const curList = exports.getListStored();

  saveListToStorage(curList.concat([urlObject]));
}

/**
 * Iterates through storage items and retrieves one whose short url matches hash if found
 * @params [string] hash
 * @returns [object|null]
 */
exports.selectHashFromStore = (hash) => {
  const curList = exports.getListStored();

  return curList.find((urlObj) => urlObj.short_url === `/${hash}`);
}
