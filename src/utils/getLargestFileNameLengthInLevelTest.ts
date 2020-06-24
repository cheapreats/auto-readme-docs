import { expect } from 'chai';
import { getLargestFileNameLengthInLevel } from './getLargestFileNameLengthInLevel';
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
  // Test for depthLevel 2
  it('should return 11 for "public/favicon.ico"', () => {
    expect(getLargestFileNameLengthInLevel(treeCore, 2)).to.equal(11);
  });
  // Test for depthLevel 3
  it('should return 8 for "src/images/Demo.gif"', () => {
    expect(getLargestFileNameLengthInLevel(treeCore, 3)).to.equal(8);
  });
  // Test for depthLevel 1
  it('should return 6 for "public"', () => {
    expect(getLargestFileNameLengthInLevel(treeCore, 1)).to.equal(6);
  });
  // Edge case for outOfBounds depthLevel 4
  it('should return -1 since maxDepthLevel is 3 and depthLevel is 4', () => {
    expect(getLargestFileNameLengthInLevel(treeCore, 4)).to.equal(-1);
  });
  // Edge case for outOfBounds depthLevel 5
  it('should return -1 since maxDepthLevel is 3 and depthLevel is 5', () => {
    expect(getLargestFileNameLengthInLevel(treeCore, 5)).to.equal(-1);
  });
  // Edge case for outOfBounds depthLevel 6
  it('should return -1 since maxDepthLevel is 3 and depthLevel is 6', () => {
    expect(getLargestFileNameLengthInLevel(treeCore, 6)).to.equal(-1);
  });
});
