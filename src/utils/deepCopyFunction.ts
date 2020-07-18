export const deepCopyFunction = (inObject) => {
  let value; let key;

  // Create an array or object to hold the values
  const outObject = Array.isArray(inObject) ? [] : {};

  if (typeof inObject !== 'object' || inObject === null) {
    return inObject; // Return the value if inObject is not an object
  }

  for (key in inObject) {
    value = inObject[key];

    // Recursively (deep) copy for nested objects, including arrays
    outObject[key] = deepCopyFunction(value);
  }

  return outObject;
};

export default deepCopyFunction;
