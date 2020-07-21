import { expect } from 'chai';
import 'mocha';
import { deleteFileFromPath } from '../deleteFileFromPath/deleteFileFromPath';
import { undoDeletions } from './undoDeletions';

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

describe('Undoes the deletion of elements from treeCore', () => {
  // Test for undo deletion of file
  it('should undo the deletion of src/images/Demo.gif by setting deleted order to -1', () => {
    deleteFileFromPath(treeCore, 'src/images/Demo.gif');
    undoDeletions(treeCore);
    expect(
      treeCore[0].treeCore[0].treeCore[1].treeCore[0].deletedOrder,
    ).to.equal(-1);
  });
  // Test for undo deletion of folder
  it('should undo the deletion of public by setting deleted order to -1', () => {
    deleteFileFromPath(treeCore, 'public');
    undoDeletions(treeCore);
    expect(treeCore[0].treeCore[1].deletedOrder).to.equal(-1);
    expect(treeCore[0].treeCore[1].treeCore[0].deletedOrder).to.equal(-1);
    expect(treeCore[0].treeCore[1].treeCore[1].deletedOrder).to.equal(-1);
  });
  // Test for undo deletion of file and folder
  it('should undo the deletion of src/images/Demo.gif and public by setting deleted order to -1', () => {
    deleteFileFromPath(treeCore, 'src/images/Demo.gif');
    deleteFileFromPath(treeCore, 'public');
    undoDeletions(treeCore, 2);
    expect(
      treeCore[0].treeCore[0].treeCore[1].treeCore[0].deletedOrder,
    ).to.equal(-1);
    expect(treeCore[0].treeCore[1].deletedOrder).to.equal(-1);
    expect(treeCore[0].treeCore[1].treeCore[0].deletedOrder).to.equal(-1);
    expect(treeCore[0].treeCore[1].treeCore[1].deletedOrder).to.equal(-1);
  });
  // Test for undo deletion of file and folder
  it('should undo the deletion of public by setting deleted order to -1', () => {
    deleteFileFromPath(treeCore, 'src/images/Demo.gif');
    deleteFileFromPath(treeCore, 'public');
    undoDeletions(treeCore);
    expect(
      treeCore[0].treeCore[0].treeCore[1].treeCore[0].deletedOrder,
    ).to.equal(1);
    expect(treeCore[0].treeCore[1].deletedOrder).to.equal(-1);
    expect(treeCore[0].treeCore[1].treeCore[0].deletedOrder).to.equal(-1);
    expect(treeCore[0].treeCore[1].treeCore[1].deletedOrder).to.equal(-1);
  });
});
