import { expect } from 'chai';
import { deleteFileFromPath } from './deleteFileFromPath';
import 'mocha';

const treeCore = [
  {
    path: 'treeCore',
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

describe('Deletes elements from treeCore', () => {
  // Test for deletion of file with no comment
  it('should delete src/images/Demo.gif by setting deleted order to 0', () => {
    deleteFileFromPath(treeCore, 'src/images/Demo.gif');
    expect(
      treeCore[0].treeCore[0].treeCore[1].treeCore[0].deletedOrder,
    ).to.equal(0);
  });
  // Test for deletion of a folder with no comment
  it('should delete public by setting deleted order to 1', () => {
    deleteFileFromPath(treeCore, 'public');
    expect(treeCore[0].treeCore[1].deletedOrder).to.equal(1);
    expect(treeCore[0].treeCore[1].treeCore[0].deletedOrder).to.equal(1);
    expect(treeCore[0].treeCore[1].treeCore[1].deletedOrder).to.equal(1);
  });
});
