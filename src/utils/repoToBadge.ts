export const repoToMarkDownBadge = (repoName: string): string => {
    const badgeDisplay = `[![npm version](https://badge.fury.io/js/${repoName}.svg)](https://badge.fury.io/js/${repoName})`;
    return badgeDisplay;
}