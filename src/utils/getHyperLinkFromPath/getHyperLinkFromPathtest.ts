import { expect } from "chai";
import getHyperLinkFromPath from "./getHyperLinkFromPath";

describe("getHyperLinkFromPath Function", () => {
  it("full address", () => {
    const result = getHyperLinkFromPath("src/components/reusable");
    expect(result).to.equal("[reusable](./src/components/reusable)");
  });
  it("single folder", () => {
    const result = getHyperLinkFromPath("src");
    expect(result).to.equal("[src](./src)");
  });
  it("relative address", () => {
    expect(() => getHyperLinkFromPath("./src")).to.throw();
  });
  it("folder starting .", () => {
    expect(() => getHyperLinkFromPath(".src/")).to.throw();
  });
  it("invalid folder name", () => {
    expect(() => getHyperLinkFromPath("sr?c")).to.throw();
  });
  it("address starting /", () => {
    expect(() => getHyperLinkFromPath("/wwqe")).to.throw();
  });
  it("address engind with .", () => {
    expect(() => getHyperLinkFromPath("src/.")).to.throw();
  });
  it("address including //", () => {
    expect(() => getHyperLinkFromPath("src//c")).to.throw();
  });
  it("adress ending with /", () => {
    expect(() => getHyperLinkFromPath("src/")).to.throw();
  });
});
