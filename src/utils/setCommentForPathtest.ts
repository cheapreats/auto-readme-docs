import { expect } from "chai";
import setCommentForPath from "./setCommentForPath";
import { FileType } from "../tree/types";

const treeCore = [
  {
    path: "src/utils",
    deletedOrder: -1,
    comment: " ",
    treeCore: [],
  },
  {
    path: "src",
    deletedOrder: -1,
    treeCore: [
      { path: "src/utils", deletedOrder: -1, comment: " ", treeCore: [] },

      {
        path: "src/components",
        deletedOrder: -1,
        comment: " # ss",
        treeCore: [],
      },
    ],
    comment: " # Source files",
  },
  {
    path: "src/components",
    deletedOrder: -1,
    comment: " # ss",
    treeCore: [],
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
    expect(newTreeCore[1].treeCore[1].comment).to.equal(" # NEW COMMENT!");
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
});
