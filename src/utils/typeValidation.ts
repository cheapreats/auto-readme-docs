import { isNumber } from "util";
import { FilterType } from "../tree/types";

const AFTER_FIELD = '":';
const AFTER_VALUE = "\n";
const EXTRA_COMMA = ",";
const FILTER_TYPE = "Filter";
const BOOLEAN_TYPE = "boolean";
const STRING_TYPE = "string";
const OBJECT_TYPE = "object";
const NUMBER_TYPE = "number";
const TRUE_VALUE = "true";
const FALSE_VALUE = "false";
const START_OF_STRING = '"';
const END_OF_STRING = '"';
const FIRST_OCCURANCE = 0;

/** Gets a string in Json format and see if value is valid according to the type
 * @param {string} text whole text
 * @param {string} field the name of the field
 * @param {string} type expected type of the field value
 * @returns {string} returns the value if it's valid
 */

export const typeValidation = (
  text: string,
  field: string,
  type: string
): any => {
  const startOfField = text.indexOf(field);
  const endOfField = text.indexOf(AFTER_FIELD, startOfField);
  const endOfValue = text.indexOf(AFTER_VALUE, endOfField);
  if (startOfField === -1) {
    return null;
  }
  let value = text.substring(endOfField + AFTER_FIELD.length, endOfValue);
  let fieldName = text.substring(endOfField + AFTER_FIELD.length, endOfValue);
  if (value.endsWith(EXTRA_COMMA)) {
    value = value.slice(FIRST_OCCURANCE, value.length - EXTRA_COMMA.length);
  }

  if (field === FILTER_TYPE) {
    if (value.slice(1, value.length - 1) in FilterType) {
      return value.slice(1, value.length - 1);
    } else {
      return null;
    }
  }
  switch (type) {
    case BOOLEAN_TYPE:
      if (value === TRUE_VALUE) {
        return true;
      } else {
        if (value === FALSE_VALUE) {
          return false;
        }
      }
    case STRING_TYPE:
      if (value.startsWith(START_OF_STRING) && value.endsWith(END_OF_STRING)) {
        return value.slice(1, value.length - 1);
      }
    case NUMBER_TYPE:
      if (isNumber(value)) {
        return value;
      }
    case OBJECT_TYPE:
      typeValidation(value, field, type);
  }
  return null;
};

export default typeValidation;
