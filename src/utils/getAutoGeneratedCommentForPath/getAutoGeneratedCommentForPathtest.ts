import { expect } from 'chai';
import getAutoGeneratedCommentForPath from './getAutoGeneratedCommentForPath';

describe('getAutoGeneratedCommentForPath Function', () => {
  it('Should retrieve the auto generated comment for common folder', () => {
    const result = getAutoGeneratedCommentForPath('src');
    expect(result).to.equal('# Source files');
  });
  it('Should return empty string for non-common folder', () => {
    const result = getAutoGeneratedCommentForPath('sssssssss');
    expect(result).to.equal('');
  });
  it('Should return empty string for empty string', () => {
    const result = getAutoGeneratedCommentForPath('');
    expect(result).to.equal('');
  });
});
