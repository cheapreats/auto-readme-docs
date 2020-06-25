import {repoToMarkDownBadge} from './repoToBadge';

describe("getting owner name and repository name from github url", () => {
    it("should return badge with owner's name (cheapreats) and repository name (react-ui-library)", () => {
        const url = 'https://github.com/cheapreats/react-ui-library'
        const pathArray = url.split('/');
        const owner = pathArray[3];
        const repo = pathArray[4];
        const badge = repoToMarkDownBadge(repo, owner)
        expect(badge).to.equal(`[![npm version](https://badge.fury.io/js/cheapreats/react-ui-library.svg)](https://badge.fury.io/js/cheapreats/react-ui-library)`); 
    })
})