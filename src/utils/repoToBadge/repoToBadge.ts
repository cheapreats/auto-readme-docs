export const repoToMarkDownBadge = ( ownerAndRepo: string[]): string => {
    const badgeDisplay = `[![npm version](https://badge.fury.io/js/${ownerAndRepo[0]}/${ownerAndRepo[1]}.svg)](https://badge.fury.io/js/${ownerAndRepo[0]}/${ownerAndRepo[1]})`;
    return badgeDisplay;
}