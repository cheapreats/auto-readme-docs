import { expect } from "chai";
import getHyperLinkFromPath from "./getHyperLinkFromPath";

describe("getHyperLinkFromPath Function", () => {
  it("Should return [reusable](./src/components/reusable)", () => {
    const result = getHyperLinkFromPath("src/components/reusable");
    expect(result).to.equal("[reusable](./src/components/reusable)");
  });
  it("Should return [reusable](./src/components/reusable)", () => {
    const result = getHyperLinkFromPath("src");
    expect(result).to.equal("[src](./src)");
  });
  it("should return Error", () => {
    expect(() => getHyperLinkFromPath("./src")).to.throw();
  });
  it("should return Error", () => {
    expect(() => getHyperLinkFromPath("./src/")).to.throw();
  });
  it("should return Error", () => {
    expect(() => getHyperLinkFromPath("./src////")).to.throw();
  });
  it("should return Error", () => {
    expect(() => getHyperLinkFromPath("/.wwqe")).to.throw();
  });
  it("should return Error", () => {
    expect(() => getHyperLinkFromPath(".//src/")).to.throw();
  });
  it("should return Error", () => {
    expect(() => getHyperLinkFromPath("src//c")).to.throw();
  });
  it("should return Error", () => {
    expect(() => getHyperLinkFromPath("src/")).to.throw();
  });
});
