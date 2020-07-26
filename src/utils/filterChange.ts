import { FilterType } from '../tree/types';

/**  Will be the MarkDownTree with only Folders
 * @param {Event} target  The whole MarkDownTree
 * @returns {FilterType} the type of Function used for filter
 */

export const filterChange = (target: HTMLInputElement): FilterType => {
  if (target.checked) {
    return FilterType.ROOT_ONLY;
  }

  return FilterType.NULL;
};

export default filterChange;
