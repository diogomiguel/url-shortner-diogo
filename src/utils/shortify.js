const alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"; // base58
const base = alphabet.length;

// Reference: https://stackoverflow.com/questions/742013/how-to-code-a-url-shortener

/**
 * Encode unique id to a matching string
 * @param  {Number} id
 * @return {String}
 */
export function encode(id) {
  let encoded = '';

  // Base58 encode that unique ID to generate a unique, shorter URL
  // e.g. An entry with the unique ID 10002 (base 10) will result in a base58 encoding of 3Ys
  while (id) {
    const remainder = id % base;
    id = Math.floor(id / base);
    encoded = `${alphabet[remainder]}${encoded}`;
  }

  return encoded;
}

/**
 * Decode unique id to the final str
 * @param  {String} str
 * @return {Number}
 */
export function decode(str) {
  let decoded = 0;

  // Reverse lookup in alphabet
  while (str) {
    const index = alphabet.indexOf(str[0]);
    const power = str.length - 1;
    decoded += index * (Math.pow(base, power));
    str = str.substring(1);
  }

  return decoded;
}
