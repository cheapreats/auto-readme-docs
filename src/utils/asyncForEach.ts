/** Calling back a function with each item of array in Async
 * @param {Array} arr Array
 * @param {Function} cb Callback Function
 */
async function asyncForEach(arr, cb) {
  for (let i = 0; i < arr.length; i++) {
    const element = await cb(arr[i], i);
  }
}

export default asyncForEach;
