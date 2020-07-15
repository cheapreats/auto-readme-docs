import { expect } from "chai";
import "mocha";
import { generateTreeCore } from "./getCopyToClipboardContents";

const treeCore = [
  {
    path: "treeCore",
    deletedOrder: -1,
    comment: "",
    treeCore: [
      {
        path: "src",
        deletedOrder: 1,
        comment: "",
        treeCore: [
          {
            path: "src/components",
            deletedOrder: 1,
            comment: "",
            treeCore: [],
          },
          {
            path: "src/images",
            deletedOrder: 1,
            comment: "",
            treeCore: [
              {
                path: "src/images/Demo.gif",
                deletedOrder: 1,
                comment: "",
                treeCore: [],
              },
            ],
          },
          {
            path: "src/tree",
            deletedOrder: 1,
            comment: "",
            treeCore: [],
          },
          {
            path: "src/utils",
            deletedOrder: 1,
            comment: "",
            treeCore: [],
          },
        ],
      },
      {
        path: "public",
        deletedOrder: -1,
        comment: "",
        treeCore: [
          {
            path: "public/favicon.ico",
            deletedOrder: 1,
            comment: "",
            treeCore: [],
          },
          {
            path: "public/index.html",
            deletedOrder: -1,
            comment: "",
            treeCore: [],
          },
        ],
      },
    ],
  },
];

describe("generates a treeCore without deleted Cores ", () => {
  // Test for undo deletion of file
  it("Treecore without deleted Cores", () => {
    const newTreeCore = generateTreeCore(treeCore);
    console.log(newTreeCore);
    expect(treeCore[0].treeCore[0].treeCore[0].path).to.equal(
      "public/index.html"
    );
  });
});
