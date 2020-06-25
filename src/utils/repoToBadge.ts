export const repoToMarkDownBadge = (repoName: string): string => {
    const badgeDisplay = `[![npm version](https://badge.fury.io/js/${ownerName}/${repoName}.svg)](https://badge.fury.io/js/${ownerName}/${repoName})`;
    return badgeDisplay;
}