import { expect } from "chai";
import getHyperLinkFromPath from "./getHyperLinkFromPath";

describe("getHyperLinkFromPath Function", () => {
  it("Should change the path to github link", () => {
    const result = getHyperLinkFromPath("src/components/reusable");
    expect(result).to.equal("[reusable](./src/components/reusable)");
  });
});
