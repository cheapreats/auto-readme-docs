import { expect } from 'chai';
import { getLargestPathLengthInLevel } from './getLargestPathLengthInLevel';
import 'mocha';

const treeCore = [
  {
    path: '',
    deletedOrder: -1,
    comment: '',
    treeCore: [
      {
        path: 'src',
        deletedOrder: -1,
        comment: '',
        treeCore: [
          {
            path: 'src/components',
            deletedOrder: -1,
            comment: '',
            treeCore: [],
          },
          {
            path: 'src/images',
            deletedOrder: -1,
            comment: '',
            treeCore: [
              {
                path: 'src/images/Demo.gif',
                deletedOrder: -1,
                comment: '',
                treeCore: [],
              },
            ],
          },
          {
            path: 'src/tree',
            deletedOrder: -1,
            comment: '',
            treeCore: [],
          },
          {
            path: 'src/utils',
            deletedOrder: -1,
            comment: '',
            treeCore: [],
          },
        ],
      },
      {
        path: 'public',
        deletedOrder: -1,
        comment: '',
        treeCore: [
          {
            path: 'public/favicon.ico',
            deletedOrder: -1,
            comment: '',
            treeCore: [],
          },
          {
            path: 'public/index.html',
            deletedOrder: -1,
            comment: '',
            treeCore: [],
          },
        ],
      },
    ],
  },
];

describe('Finds the largest path length in a treeCore given the depth level wanted for analysis', () => {
  // Test for depthLevel 1
  it('should return 6', () => {
    expect(getLargestPathLengthInLevel(treeCore, 1)).to.equal(6);
  });
  // Test for depthLevel 2
  it('should return 18', () => {
    expect(getLargestPathLengthInLevel(treeCore, 2)).to.equal(18);
  });
  // Test for depthLevel 3
  it('should return 19', () => {
    expect(getLargestPathLengthInLevel(treeCore, 3)).to.equal(19);
  });
  // Test for outOfBounds depthLevel 4
  it('should return -1', () => {
    expect(getLargestPathLengthInLevel(treeCore, 4)).to.equal(-1);
  });
  // Test for outOfBounds depthLevel 5
  it('should return -1', () => {
    expect(getLargestPathLengthInLevel(treeCore, 5)).to.equal(-1);
  });
  // Test for outOfBounds depthLevel 6
  it('should return -1', () => {
    expect(getLargestPathLengthInLevel(treeCore, 6)).to.equal(-1);
  });
});
