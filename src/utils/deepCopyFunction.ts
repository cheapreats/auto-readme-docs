import { Core } from "../tree/types";

/**  Will return the Deep Clone of the TreeCore
 * @param {Core[]|Core} inObject  The whole MarkDownTree or a Core
 * @returns {Core[]} deep clone of the MarkDownTree
 */

export const deepCopyFunction = (inObject: Core[] | Core): Core[] => {
  let value: Core;
  let key: string;

  const outObject = [];

  if (typeof inObject !== "object" || inObject === null) {
    return inObject;
  }

  for (key in inObject) {
    value = inObject[key];
    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyFunction(value);
  }

  return outObject;
};

export default deepCopyFunction;
