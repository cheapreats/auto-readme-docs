import { expect } from "chai";
import { getFileTypeFromPath } from "./getFileTypeFromPath";
import "mocha";

describe("Finds file type of path depending on the amount of dots, placement of dots, and placement of forward slashes", () => {
  // FileType.FILE test
  it("should return FILE", () => {
    const result = getFileTypeFromPath("src/tree/index.ts", true);
    expect(result).to.equal("FILE");
  });
  // FileType.FILE test
  it("should return FILE", () => {
    const result = getFileTypeFromPath("src/tree/2020.index.ts", true);
    expect(result).to.equal("FILE");
  });
  // FileType.CONFIG_FILE test
  it("should return CONFIG_FILE", () => {
    const result = getFileTypeFromPath("src/.eslintrc.js", true);
    expect(result).to.equal("CONFIG_FILE");
  });
  // FileType.FOLDER test
  it("should return FOLDER", () => {
    const result = getFileTypeFromPath("src/tree", false);
    expect(result).to.equal("FOLDER");
  });
  it("should return FOLDER", () => {
    const result = getFileTypeFromPath("src/.tree", false);
    expect(result).to.equal("FOLDER");
  });
  // Edge case test
  it('should return "Path/file is invalid!"', () => {
    expect(() =>
      getFileTypeFromPath("./src/tree/../w.e.e/we.we///", true)
    ).to.throw();
  });
  // Edge case test
  it('should return "Path/file is invalid!"', () => {
    expect(() => getFileTypeFromPath("./src/tree/", false)).to.throw();
  });
  // Edge case test
  it('should return "Path/file is invalid!"', () => {
    expect(() => getFileTypeFromPath("src/tree./", false)).to.throw();
  });
  // Edge case test
  it('should return "Path/file is invalid!"', () => {
    expect(() => getFileTypeFromPath("src/..tree./", false)).to.throw();
  });
});
