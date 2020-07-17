/* eslint-disable quotes */
import { expect } from "chai";
import getCopyToClipboardContents from "./getCopyToClipboardContents";

const treeCore = [
  {
    path: "src",
    deletedOrder: -1,
    treeCore: [
      {
        path: "src/utils",
        deletedOrder: 1,
        comment: "# just a comment",
        treeCore: [],
      },
      {
        path: "src/components",
        deletedOrder: -1,
        comment: "# another comment",
        treeCore: [
          {
            path: "src/components/reusable",
            deletedOrder: 1,
            comment: "",
            treeCore: [],
          },
        ],
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
    path: "doc2",
    deletedOrder: 1,
    comment: "",
    treeCore: [
      {
        path: "doc2/knives",
        deletedOrder: -1,
        comment: "# John",
        treeCore: [],
      },
      {
        path: "doc2/out",
        deletedOrder: -1,
        comment: "# Mellencamp",
        treeCore: [],
      },
    ],
  },
];

const result = [
  "📂 [src](./src) # Source files",
  "├── 📂 [components](./src/components) # another comment",
  "├── 📄 [test.jpg](./src/test.jpg) ",
  "📂 [doc](./doc) # Documentation files",
];

describe("generate a tree without deleted items", () => {
  it(" a tree containing file,folder,3 levels,deleted folders in each level", () => {
    const newTreeCore = getCopyToClipboardContents(treeCore);
    expect(newTreeCore.toString()).to.equal(result.toString());
  });
});
