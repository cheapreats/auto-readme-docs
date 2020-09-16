import { isNumber } from "util";
import { FilterType, AuthorTableType } from "../tree/types";

const AFTER_FIELD = '":';
const AFTER_VALUE = "\n";
const EXTRA_COMMA = ",";
const FILTER_TYPE = "Filter";
const AUTHOR_TABLE_TYPE = "TableDesign";
const BACKERS_TYPE = "Backers";
const SPONSORS_TYPE = "Sponsors";
const BOOLEAN_TYPE = "boolean";
const STRING_TYPE = "string";
const OBJECT_TYPE = "object";
const NUMBER_TYPE = "number";
const TRUE_VALUE = "true";
const FALSE_VALUE = "false";
const START_OF_STRING = '"';
const END_OF_STRING = '"';
const START_OF_ARRAY = "[";
const END_OF_ARRAY = "]";
const FIRST_OCCURANCE = 0;

/** Validates Array Value
 * @param {string} value Value in sring form
 * @returns {string} returns the value in form of an array
 */
const validateArray = (value) => {
  let array = value.split(EXTRA_COMMA);
  array[FIRST_OCCURANCE] = array[FIRST_OCCURANCE].slice(START_OF_ARRAY.length);
  array[array.length - END_OF_ARRAY.length] = array[
    array.length - END_OF_ARRAY.length
  ].slice(FIRST_OCCURANCE, -END_OF_ARRAY.length);
  const output = array.map((element) => {
    element = element.slice(START_OF_STRING.length);
    element = element.slice(FIRST_OCCURANCE, -END_OF_ARRAY.length);
    return element;
  });
  return output;
};

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
  if (value.endsWith(EXTRA_COMMA)) {
    value = value.slice(FIRST_OCCURANCE, value.length - EXTRA_COMMA.length);
  }
  if (field === BACKERS_TYPE || field === SPONSORS_TYPE) {
    return validateArray(value);
  }

  if (field === FILTER_TYPE) {
    if (
      value.slice(
        START_OF_STRING.length,
        value.length - END_OF_STRING.length
      ) in FilterType
    ) {
      return value.slice(
        START_OF_STRING.length,
        value.length - END_OF_STRING.length
      );
    } else {
      return null;
    }
  }

  if (field === AUTHOR_TABLE_TYPE) {
    if (
      value.slice(
        START_OF_STRING.length,
        value.length - END_OF_STRING.length
      ) in AuthorTableType
    ) {
      return value.slice(
        START_OF_STRING.length,
        value.length - END_OF_STRING.length
      );
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
        return value.slice(
          START_OF_STRING.length,
          value.length - END_OF_STRING.length
        );
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
