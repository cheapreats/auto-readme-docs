import { expect } from 'chai';
import { repoToMarkDownBadge } from './repoToBadge';

describe('creates an npm link using the given owner and repository name (for badge)', () => {
  it('should return [![npm version](https://badge.fury.io/js/cheapreats/react-ui-library.svg)](https://badge.fury.io/js/cheapreats/react-ui-library)', () => {
    const ownerAndRepo = ['cheapreats', 'react-ui-library'];
    expect(repoToMarkDownBadge(ownerAndRepo)).to.equal(
      '[![npm version](https://badge.fury.io/js/cheapreats/react-ui-library.svg)](https://badge.fury.io/js/cheapreats/react-ui-library)',
    );
  });
});
