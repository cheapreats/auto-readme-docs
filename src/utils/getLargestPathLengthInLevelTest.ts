import { expect } from "chai";
import { getLargestPathLengthInLevel } from "./getLargestPathLengthInLevel";
import "mocha";

describe("does its job", () => {
  it("should return this", () => {
    const treeCore = [
      {
        path: "",
        deletedOrder: -1,
        comment: "",
        treeCore: [
          {
            path: "src",
            deletedOrder: -1,
            comment: "",
            treeCore: [],
          },
          {
            path: "public",
            deletedOrder: -1,
            comment: "",
            treeCore: [],
          },
        ],
      },
    ];
    expect(getLargestPathLengthInLevel(treeCore, 1)).to.equal(6);
  });
});
