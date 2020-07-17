import { expect } from "chai";
import {formatLanguages} from "./formatLanguages";

describe('Formatting Language Function', () => {
    it(`should return a markdown ready link to the languages website`, () => {
        const languages = {TypeScript: 60109, HTML: 1406, JavaScript: 1387, CSS: 773};
        expect(formatLanguages(languages)).to.equal([`[🔗](https://www.typescriptlang.org/) TypeScript`]);
    });
});