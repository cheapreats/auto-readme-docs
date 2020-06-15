import { TreeCore } from "../tree/types";
/**  Replaces the existing comment by a given string
 * @param {TreeCore} treeCore the whole tree
 * @param {string} path The path of a specific file
 * @param {string} comment any string
 * @returns {void}
 */

export const setCommentForPath = (treeCore:TreeCore, path: string, comment: string): void => {
    treeCore.forEach((core) => {
        if (path=core.text) {
            core.comment=comment;
        }
    }
    // Or Core:the target core & no need for path
    //    core.forEach((core) => {
    //        core.comment=comment; }
};

export default setCommentForPath;
