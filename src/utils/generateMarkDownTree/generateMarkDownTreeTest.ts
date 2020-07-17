/* eslint-disable quotes */
import { expect } from 'chai';
import generateMarkDownTree from './generateMarkDownTree';
import selectFoldersOnly from '../selectFoldersOnly/selectFoldersOnly';
import selectRootCores from '../selectRootCores/selectRootCores';

const treeCore = [
  {
    path: 'ex',
    deletedOrder: -1,
    comment: '# just a comment',
    treeCore: [
      {
        path: 'ex/aaa7',
        deletedOrder: 1,
        comment: '# just a comment',
        treeCore: [],
      },
    ],
  },
  {
    path: 'src',
    deletedOrder: -1,
    treeCore: [
      {
        path: 'src/utils',
        deletedOrder: -1,
        comment: '# just a comment',
        treeCore: [],
      },
      {
        path: 'src/components',
        deletedOrder: -1,
        comment: '# another comment',
        treeCore: [
          {
            path: 'src/components/reusable',
            deletedOrder: -1,
            comment: '',
            treeCore: [],
          },
        ],
      },
      {
        path: 'src/test.jpg',
        deletedOrder: -1,
        comment: '',
        treeCore: [],
      },
    ],
    comment: '',
  },
  {
    path: 'doc',
    deletedOrder: -1,
    comment: '',
    treeCore: [],
  },
  {
    path: 'doc2',
    deletedOrder: -1,
    comment: '',
    treeCore: [
      {
        path: 'doc2/knives',
        deletedOrder: -1,
        comment: '# John',
        treeCore: [],
      },
      {
        path: 'doc2/out',
        deletedOrder: -1,
        comment: '# Mellencamp',
        treeCore: [],
      },
    ],
  },
  {
    path: 'doc222',
    deletedOrder: -1,
    comment: '# testing',
    treeCore: [],
  },
];

const resultwhole = [
  '📂 [ex](./ex)     # just a comment',
  '├── 📂 [aaa7](./ex/aaa7) # just a comment',
  '📂 [src](./src)    # Source files',
  '├── 📂 [utils](./src/utils)      # just a comment',
  '├── 📂 [components](./src/components) # another comment',
  '│   ├── 📂 [reusable](./src/components/reusable) ',
  '├── 📄 [test.jpg](./src/test.jpg) ',
  '📂 [doc](./doc)    # Documentation files',
  '📂 [doc2](./doc2) ',
  '├── 📂 [knives](./doc2/knives) # John',
  '├── 📂 [out](./doc2/out)    # Mellencamp',
  '📂 [doc222](./doc222) # testing',
];

const resultfoldersonly = [
  '📂 [ex](./ex)     # just a comment',
  '├── 📂 [aaa7](./ex/aaa7) # just a comment',
  '📂 [src](./src)    # Source files',
  '├── 📂 [utils](./src/utils)      # just a comment',
  '├── 📂 [components](./src/components) # another comment',
  '│   ├── 📂 [reusable](./src/components/reusable) ',
  '📂 [doc](./doc)    # Documentation files',
  '📂 [doc2](./doc2) ',
  '├── 📂 [knives](./doc2/knives) # John',
  '├── 📂 [out](./doc2/out)    # Mellencamp',
  '📂 [doc222](./doc222) # testing',
];

const resultrootsonly = [
  '📂 [ex](./ex)     # just a comment',
  '📂 [src](./src)    # Source files',
  '📂 [doc](./doc)    # Documentation files',
  '📂 [doc2](./doc2) ',
  '📂 [doc222](./doc222) # testing',
];

describe('Generate Tree', () => {
  it(' a tree containing file,folder,3 levels,deleted folders with comment and no comments ', () => {
    const newTreeCore = generateMarkDownTree(treeCore);
    expect(newTreeCore.toString).to.equal(resultwhole.toString);
  });
  it('folders only ', () => {
    const newTreeCore = generateMarkDownTree(treeCore, selectFoldersOnly);
    expect(newTreeCore.toString).to.equal(resultfoldersonly.toString);
  });
  it('Root only ', () => {
    const newTreeCore = generateMarkDownTree(treeCore, selectRootCores);
    expect(newTreeCore.toString).to.equal(resultrootsonly.toString);
  });
});
