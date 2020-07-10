/* eslint-disable quotes */
import { expect } from "chai";
import selectFoldersOnly from "./selectFoldersOnly";

const treeCore = [
  {
    path: "src",
    deletedOrder: -1,
    treeCore: [
      {
        path: "src/components",
        deletedOrder: -1,
        comment: "# another comment",
        treeCore: [],
      },
      {
        path: "src/test.jpg",
        deletedOrder: -1,
        comment: "",
        treeCore: [],
      },
    ],
    comment: "",
  },
  {
    path: "doc",
    deletedOrder: -1,
    comment: "",
    treeCore: [],
  },
  {
    path: "file.jpg",
    deletedOrder: -1,
    comment: "",
    treeCore: [],
  },
  {
    path: "doc2.jpg",
    deletedOrder: -1,
    comment: "",
    treeCore: [],
  },
];

const result = [
  "📂 [src](./src) # Source files",
  "├── 📂 [components](./src/components) # another comment",
  "📂 [doc](./doc) # Documentation files",
];

describe("selectRootOnly Function", () => {
  it("generates a tree with only folders (not the files)", () => {
    const newTreeCore = selectFoldersOnly(treeCore);
    expect(newTreeCore.toString).to.equal(result.toString);
  });
});
