export const getNpmLinkFromOwnerAndRepo = (ownerAndRepo: string[]): string => {
    const npmUrl = `https://badge.fury.io/js/${ownerAndRepo[0]}/${ownerAndRepo[1]}.svg`
    return npmUrl;
}