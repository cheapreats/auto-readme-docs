import tagWrap from "./tagWrap";
import { WrapTagType } from "../tree/types";
import { IConfigurationState } from "../contexts/configuration/ConfigurationContext";

const CELL_DESIGN = "CELL_DESIGN";
const CONTRIBUTIONS_TITLE = "Contributions: ";
const REPOS_TITLE = "Public Repos: ";
const NUMBER_OF_CELLS_PER_ROW = 5;
const TWITTER_ICON = "🐦";

const VERTICAL_DESIGN = "VERTICAL";
const USER_NAME_HEADER = "Name";
const USER_PICTURE_HEADER = "Picture";
const USER_EMAIL_HEADER = "Email";
const USER_LOCATION_HEADER = "Location";
const USER_CONTRIBUTIONS_HEADER = "Contributions";
const USER_REPOS_HEADER = "Repos";
const USER_TWITTER_HEADER = "Twitter";

const TH_TAG = "th";
const TD_TAG = "td";
const TR_TAG = "tr";
const TR_OPEN_TAG = "<tr>";
const TABLE_TAG = "table";
const B_TAG = "b";
const SUB_TAG = "sub";
const BR_TAG = "<br />";
const A_TAG = "a";

const USER_LINK_FIELD = "html_url";
const WITH_LOGIN_FIELD = "login";
const WITH_PICTURE_FIELD = "avatar_url";
const WITH_CONTRIBUTIONS_FIELD = "contributions";
const WITH_EMAIL_FIELD = "email";
const WITH_LOCATION_FIELD = "location";
const WITH_TWITTER_USERNAME_FIELD = "twitter_userName";
const WITH_NUMBER_OF_REPOS_FIELD = "public_repos";
const ALIGN_TD = "center";
const IMAGE_SIZE = "100px;";
const TWITTER_SIZE = "70px;";
const TWITTER_PICTURE =
  "https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-512.png";
const NO_VALUE = "";

let detailsToAdd = "";

/**  gets a value and returns another value in case its null
 * @param {any} value - any value
 * @returns {any} - the value incase its null or not
 */
const returnValue = (value) => {
  if (value === null) {
    return NO_VALUE;
  } else {
    return value;
  }
};

/**  Generates the details of the Table in rows in Vertical mode
 * @param {object[]} contributors - list of contributors and related data
 * @param {IConfigurationState} config - configuration states
 * @returns {string} - Generated Row
 */
const generateRow = (contributer, config) => {
  let row = "";
  if (config.AuthorConfigs.AuthorInfo.WithName) {
    row += `<td align=${ALIGN_TD}>
        <a href=${contributer[USER_LINK_FIELD]}>
          ${contributer[WITH_LOGIN_FIELD]}`;
    row = tagWrap(row, A_TAG, WrapTagType.CLOSE);
    row = tagWrap(row, TD_TAG, WrapTagType.CLOSE);
  }
  if (config.AuthorConfigs.AuthorInfo.WithPicture) {
    row += `<td align=${ALIGN_TD}>
        <a href=${contributer[USER_LINK_FIELD]}>
          <img
            src=${contributer[WITH_PICTURE_FIELD]}
            width=${IMAGE_SIZE}
          />`;
    row = tagWrap(row, A_TAG, WrapTagType.CLOSE);
    row = tagWrap(row, TD_TAG, WrapTagType.CLOSE);
  }
  if (config.AuthorConfigs.AuthorInfo.WithEmail) {
    row += `<td align=${ALIGN_TD}>${returnValue(
      contributer[WITH_EMAIL_FIELD]
    )}`;
    row = tagWrap(row, TD_TAG, WrapTagType.CLOSE);
  }
  if (config.AuthorConfigs.AuthorInfo.WithLocation) {
    row += `<td align=${ALIGN_TD}>${returnValue(
      contributer[WITH_LOCATION_FIELD]
    )}`;
    row = tagWrap(row, TD_TAG, WrapTagType.CLOSE);
  }
  if (config.AuthorConfigs.AuthorInfo.WithContributions) {
    row += `<td align=${ALIGN_TD}>${returnValue(
      contributer[WITH_CONTRIBUTIONS_FIELD]
    )}`;
    row = tagWrap(row, TD_TAG, WrapTagType.CLOSE);
  }
  if (config.AuthorConfigs.AuthorInfo.WithNumberOfRepos) {
    row += `<td align=${ALIGN_TD}>${returnValue(
      contributer[WITH_NUMBER_OF_REPOS_FIELD]
    )}`;
    row = tagWrap(row, TD_TAG, WrapTagType.CLOSE);
  }
  if (config.AuthorConfigs.AuthorInfo.WithTwitterUsername) {
    row += `<td align=${ALIGN_TD}>
        <a href=${contributer[WITH_TWITTER_USERNAME_FIELD]}>
          <img src=${TWITTER_PICTURE} width=${TWITTER_SIZE} />`;
    row = tagWrap(row, A_TAG, WrapTagType.CLOSE);
    row = tagWrap(row, TD_TAG, WrapTagType.CLOSE);
  }
  row = tagWrap(row, TR_TAG);
  return row;
};

/**  Generates the details of the Table in cells in CellDesign mode
 * @param {object[]} contributors - list of contributors and related data
 * @param {IConfigurationState} config - configuration states
 * @returns {string} - Generated Cell
 */
const generateCell = (contributer, config) => {
  let cell = `<td align=${ALIGN_TD}>`;
  if (config.AuthorConfigs.AuthorInfo.WithPicture) {
    cell += `<a href=${contributer[USER_LINK_FIELD]}><img src=${contributer[WITH_PICTURE_FIELD]}width=${IMAGE_SIZE}/>`;
    cell = tagWrap(cell, A_TAG, WrapTagType.CLOSE);
    cell += BR_TAG;
  }

  if (config.AuthorConfigs.AuthorInfo.WithName) {
    let loginName = `${contributer[WITH_LOGIN_FIELD]}`;
    loginName = tagWrap(loginName, B_TAG);
    loginName = tagWrap(loginName, SUB_TAG);
    cell += `<a href=${contributer[USER_LINK_FIELD]}>${loginName}`;
    cell = tagWrap(cell, A_TAG, WrapTagType.CLOSE);
    cell += BR_TAG;
  }
  if (config.AuthorConfigs.AuthorInfo.WithEmail) {
    cell += `${returnValue(contributer[WITH_EMAIL_FIELD])}${BR_TAG}`;
  }

  if (config.AuthorConfigs.AuthorInfo.WithLocation) {
    cell += `${returnValue(contributer[WITH_LOCATION_FIELD])}${BR_TAG}`;
  }

  if (config.AuthorConfigs.AuthorInfo.WithContributions) {
    cell += `${CONTRIBUTIONS_TITLE} ${returnValue(
      contributer[WITH_CONTRIBUTIONS_FIELD]
    )}${BR_TAG}`;
  }
  if (config.AuthorConfigs.AuthorInfo.WithNumberOfRepos) {
    cell += `${REPOS_TITLE} ${returnValue(
      contributer[WITH_NUMBER_OF_REPOS_FIELD]
    )}${BR_TAG}`;
  }
  if (config.AuthorConfigs.AuthorInfo.WithTwitterUsername) {
    cell += `<a href=${contributer[WITH_TWITTER_USERNAME_FIELD]}>${TWITTER_ICON}`;
    cell = tagWrap(cell, A_TAG, WrapTagType.CLOSE);
  }
  cell = tagWrap(cell, TD_TAG, WrapTagType.CLOSE);
  return cell;
};

/**  Given config and data and name of the owner will generate Author's Table
 * @param {IConfigurationState} config - configuration states
 * @param {object[]} contributors - list of contributors and related data
 * @param {string} ownersName - Repository owners name
 * @returns {string} - Generated Table
 */
export const generateAuthorsTable = (
  config: IConfigurationState,
  contributors: object[],
  ownersName: string
): string => {
  let output = "";
  output = tagWrap(output, TR_TAG, WrapTagType.OPEN);
  if (config.AuthorConfigs.TableDesign === CELL_DESIGN) {
    if (config.AuthorConfigs.onlyOwner) {
      contributors
        .filter((contributors) => contributors[WITH_LOGIN_FIELD] === ownersName)
        .map((contributer, key) => {
          output += generateCell(contributer, config);
          output = tagWrap(output, TR_TAG, WrapTagType.CLOSE);
        });
    } else {
      contributors.map((contributer, key) => {
        output += generateCell(contributer, config);
        if ((key + 1) % NUMBER_OF_CELLS_PER_ROW === 0) {
          output = tagWrap(output, TR_TAG, WrapTagType.CLOSE);
          output += TR_OPEN_TAG;
        }
      });
    }
  } else {
    if (config.AuthorConfigs.AuthorInfo.WithName) {
      output += tagWrap(USER_NAME_HEADER, TH_TAG);
    }
    if (config.AuthorConfigs.AuthorInfo.WithPicture) {
      output += tagWrap(USER_PICTURE_HEADER, TH_TAG);
    }
    if (config.AuthorConfigs.AuthorInfo.WithEmail) {
      output += tagWrap(USER_EMAIL_HEADER, TH_TAG);
    }
    if (config.AuthorConfigs.AuthorInfo.WithLocation) {
      output += tagWrap(USER_LOCATION_HEADER, TH_TAG);
    }
    if (config.AuthorConfigs.AuthorInfo.WithContributions) {
      output += tagWrap(USER_CONTRIBUTIONS_HEADER, TH_TAG);
    }
    if (config.AuthorConfigs.AuthorInfo.WithNumberOfRepos) {
      output += tagWrap(USER_REPOS_HEADER, TH_TAG);
    }
    if (config.AuthorConfigs.AuthorInfo.WithTwitterUsername) {
      output += tagWrap(USER_TWITTER_HEADER, TH_TAG);
    }
    output = tagWrap(output, TR_TAG);

    if (config.AuthorConfigs.onlyOwner) {
      contributors
        .filter((contributors) => contributors[WITH_LOGIN_FIELD] === ownersName)
        .map((contributer, key) => {
          output += generateRow(contributer, config);
        });
    } else {
      contributors.map((contributer, key) => {
        output += generateRow(contributer, config);
      });
    }
  }
  output = tagWrap(output, TABLE_TAG);

  return output;
};

export default generateAuthorsTable;
