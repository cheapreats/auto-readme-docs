import { expect } from 'chai';
import { getOwnerAndRepoFromUrl } from './getOwnerAndRepoFromUrl';

describe('splits github link and creates an array with the owner and repository name', () => {
  it('should return an array [\'cheapreats\', \'react-ui-library\']', () => {
    const testUrl = 'https://github.com/cheapreats/react-ui-library';
    expect(getOwnerAndRepoFromUrl(testUrl)).to.equal([
      'cheapreats',
      'react-ui-library',
    ]);
  });
});
