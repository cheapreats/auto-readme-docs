import typeValidation from "./typeValidation";

const OBJECT_TYPE = "object";

/** Gets the whole decoded text and updates config object accordingly
 * @param {string} decodedBlobs the whole decoded text
 * @param {object} config the config object
 * @returns {object} returns the updated config object
 */

export const updateConfig = (decodedBlobs: string, config: object): any => {
  for (let field in config) {
    if (typeof config[field] === OBJECT_TYPE) {
      config[field] = updateConfig(decodedBlobs, config[field]);
    }
    if (typeValidation(decodedBlobs, field, typeof config[field]) !== null) {
      config[field] = typeValidation(decodedBlobs, field, typeof config[field]);
    }
  }
  return config;
};

export default updateConfig;
