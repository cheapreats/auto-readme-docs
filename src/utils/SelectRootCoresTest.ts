/* eslint-disable quotes */
import { expect } from "chai";
import SelectRootCores from "./SelectRootCores";

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
    path: "file.jpg",
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
  "📂 [src](./src)      # Source files",
  "📂 [doc](./doc)      # Documentation files",
  "📄 [file.jpg](./file.jpg) ",
  "📂 [doc2](./doc2) ",
];

describe("SelectRootCores", () => {
  it("shows only the Cores on the root address", () => {
    const newTreeCore = SelectRootCores(treeCore);
    expect(newTreeCore.toString).to.equal(result.toString);
  });
});
