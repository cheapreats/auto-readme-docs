import { expect } from "chai";
import setCommentForPath from "./setCommentForPath";
import { FileType } from "../tree/types";

const treeCore = [
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
    comment: " # ss",
  },
];

describe("setCommentForPath Function", () => {
  it("folder in root", () => {
    const newTreeCore = setCommentForPath(treeCore, "src", "NEW COMMENT!");
    expect(newTreeCore[1].comment).to.equal(" # NEW COMMENT!");
  });
  it("folder at deeper levels", () => {
    const newTreeCore = setCommentForPath(
      treeCore,
      "src/components",
      "NEW COMMENT!"
    );
    expect(newTreeCore[2].comment).to.equal(" # NEW COMMENT!");
  });
  it("folder with no comment", () => {
    const newTreeCore = setCommentForPath(
      treeCore,
      "src/utils",
      "NEW COMMENT!"
    );
    expect(newTreeCore[0].comment).to.equal(" # NEW COMMENT!");
  });
  it("deleting comment", () => {
    const newTreeCore = setCommentForPath(treeCore, "src/utils", "");
    expect(newTreeCore[0].comment).to.equal("");
  });
  it("Invalid address", () => {
    expect(() =>
      setCommentForPath(treeCore, "///ds//", "NEW COMMENT!")
    ).to.throw();
  });
  it("Wrong address", () => {
    expect(() =>
      setCommentForPath(treeCore, "src/components/wrongfolder", "NEW COMMENT!")
    ).to.throw();
  });
});
