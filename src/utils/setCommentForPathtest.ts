import { expect } from "chai";
import setCommentForPath from "./setCommentForPath";
import { FileType } from "../tree/types";

let treeCore = [
  {
    text: "src/utils",
    depthLevel: 2,
    fileType: FileType.FOLDER,
    comment: " ",
  },
  {
    text: "src",
    depthLevel: 1,
    fileType: FileType.FOLDER,
    comment: " # Source files",
  },
  {
    text: "src/components",
    depthLevel: 2,
    fileType: FileType.FOLDER,
    comment: "ss ",
  },
];

describe("setCommentForPath Function", () => {
  it("full address", () => {
    setCommentForPath(treeCore, "src", "NEW COMMENT!");
    expect(treeCore).to.equal([
      {
        text: "src/utils",
        depthLevel: 2,
        fileType: FileType.FOLDER,
        comment: " ",
      },
      {
        text: "src",
        depthLevel: 1,
        fileType: FileType.FOLDER,
        comment: " # NEW COMMENT!",
      },
      {
        text: "src/components",
        depthLevel: 2,
        fileType: FileType.FOLDER,
        comment: "ss ",
      },
    ]);
  });
});
console.log("outside", treeCore);
