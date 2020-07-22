import { Core } from '../tree/types';

/**  Will be the MarkDownTree without the deletedCore's (Any core with
 * deletedOrder > -1)
 * @param {Core[]|Core} inObject - the whole MarkDownTree or a Core
 * @returns {Core[]} - deep clone of the MarkDownTree
 */

export const deepCopyFunction = (inObject: Core[] | Core): Core[] => {
  // Create an array or object to hold the values
  const outObject: Core[] = [];

  if (typeof inObject !== 'object' || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  if (typeof inObject === 'object') {
    outObject.push(Object.assign(inObject));
  } else {
    (inObject as Core[]).forEach((objectKey: Core) => {
      // Recursively (deep) copy for nested objects, including arrays
      outObject.push(...deepCopyFunction(objectKey));
    });
  }

  return outObject;
};

export default deepCopyFunction;
