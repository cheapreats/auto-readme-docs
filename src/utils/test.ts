import { expect } from "chai";
import getHyperLinkFromPath from "./getHyperLinkFromPath";

describe("getHyperLinkFromPath Function", () => {
  it("test for full address : Should return [reusable](./src/components/reusable)", () => {
    const result = getHyperLinkFromPath("src/components/reusable");
    expect(result).to.equal("[reusable](./src/components/reusable)");
  });
  it("test for single folder : Should return [src](./src)", () => {
    const result = getHyperLinkFromPath("src");
    expect(result).to.equal("[src](./src)");
  });
  it("test for relative address : should return Error", () => {
    expect(() => getHyperLinkFromPath("./src")).to.throw();
  });
  it("test for folder starting . : should return Error", () => {
    expect(() => getHyperLinkFromPath(".src/")).to.throw();
  });
  it("test for invalid folder name : should return Error", () => {
    expect(() => getHyperLinkFromPath("sr?c")).to.throw();
  });
  it("test for address starting / : should return Error", () => {
    expect(() => getHyperLinkFromPath("/wwqe")).to.throw();
  });
  it("test for address engind with . : should return Error", () => {
    expect(() => getHyperLinkFromPath("src/.")).to.throw();
  });
  it("test for address including // : should return Error", () => {
    expect(() => getHyperLinkFromPath("src//c")).to.throw();
  });
  it("test for adress ending with / : should return Error", () => {
    expect(() => getHyperLinkFromPath("src/")).to.throw();
  });
});
