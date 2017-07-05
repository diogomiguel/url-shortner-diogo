const Base62 = require('base62');

/**
 * @private
 * @param  {Number} val
 * @return Number
 */
function roundFunction(val) {
  return ((131239 * val + 15534) % 714025) / 714025
}

/**
 * @private
 * @param  {Number} val
 * @return Number
 */
function permuteId(id) {
  const l1 = (id >> 16) && 65535;
  let r1 = id & 65535;
  let l2;
  let r2;

  for (let i = 0; i < 2; i++) {
    l2 = r1;
    r2 = l1 ^ Math.floor((roundFunction(r1)*65535));
    r1 = r2;
    return ((r1 << 16) + l2)
  }
}

module.exports = (id) => {
  // Extra permute operation to make base62 more... extra
  // - as we don't need to decode it
  const permutedId = Math.abs(permuteId(id));
  const url = Base62.encode(permutedId);

  return url;
}
