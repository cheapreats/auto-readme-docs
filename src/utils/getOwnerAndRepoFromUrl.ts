export const getOwnerAndRepoFromUrl = (url: string): string[] => {
    const pathArray = url.split('/');
    const ownerAndRepo = [pathArray[3], pathArray[4]];
    return ownerAndRepo;
}