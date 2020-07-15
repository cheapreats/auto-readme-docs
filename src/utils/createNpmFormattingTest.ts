import {  getNpmLinkFromOwnerAndRepo } from './createNpmFormatting'
import { expect } from "chai";

describe('creates an npm link using the given owner and repository name', () => {
    it(`should return https://badge.fury.io/js/cheapreats/react-ui-library.svg since owner name is cheapreats and repository name is react-ui-library`, () => {
        const ownerAndRepo = ['cheapreats', 'react-ui-library'];
        expect(getNpmLinkFromOwnerAndRepo(ownerAndRepo)).to.equal('https://badge.fury.io/js/cheapreats/react-ui-library.svg');
    });
});