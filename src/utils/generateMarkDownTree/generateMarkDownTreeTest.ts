import { expect } from 'chai';
import generateMarkDownTree from './generateMarkDownTree';
import { FilterType } from '../../tree/types';

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

const newCore = [
  {
    path: 'ex',
    deletedOrder: -1,
    comment: '',
    treeCore: [
      {
        path: 'ex/aaa5.ts',
        deletedOrder: -1,
        comment: '',
        treeCore: [],
      },
      {
        path: 'ex/aaa6.ts',
        deletedOrder: -1,
        comment: '',
        treeCore: [],
      },
      {
        path: 'ex/aaa7.ts',
        deletedOrder: -1,
        comment: '',
        treeCore: [],
      },
    ],
  },
];

const newCore2 = [
  {
    path: 'ex',
    deletedOrder: -1,
    comment: '',
    treeCore: [
      {
        path: 'aaa',
        deletedOrder: -1,
        comment: '',
        treeCore: [
          {
            path: 'ex/aaa/aaa5.ts',
            deletedOrder: -1,
            comment: '',
            treeCore: [],
          },
          {
            path: 'ex/aaa/aaa6.ts',
            deletedOrder: -1,
            comment: '',
            treeCore: [],
          },
          {
            path: 'ex/aaa/aaa7.ts',
            deletedOrder: -1,
            comment: '',
            treeCore: [],
          },
        ],
      },
    ],
  },
];

const newCore3 = [
  {
    path: 'ex',
    deletedOrder: -1,
    comment: '',
    treeCore: [
      {
        path: 'ex/aaa5.ts',
        deletedOrder: -1,
        comment: '',
        treeCore: [],
      },
      {
        path: 'ex/aaa6.ts',
        deletedOrder: -1,
        comment: '',
        treeCore: [],
      },
      {
        path: 'ex/aaa7.ts',
        deletedOrder: -1,
        comment: '',
        treeCore: [],
      },
      {
        path: 'ex/aaa',
        deletedOrder: -1,
        comment: '',
        treeCore: [],
      },
    ],
  },
];

const newCore4 = [
  {
    path: 'ex',
    deletedOrder: -1,
    comment: '',
    treeCore: [
      {
        path: 'ex/aaa5.ts',
        deletedOrder: -1,
        comment: '',
        treeCore: [],
      },
      {
        path: 'ex/aaa',
        deletedOrder: -1,
        comment: '',
        treeCore: [],
      },
    ],
  },
  {
    path: 'ex2',
    deletedOrder: -1,
    comment: '',
    treeCore: [
      {
        path: 'ex2/aaa6.ts',
        deletedOrder: -1,
        comment: '',
        treeCore: [],
      },
      {
        path: 'ex2/aaa2',
        deletedOrder: -1,
        comment: '',
        treeCore: [],
      },
    ],
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

const newResult = [
  '<details> <summary>📂 [ex](./ex)</summary>',
  '├── 📄 [aaa5](./ex/aaa5.ts)',
  '├── 📄 [aaa6](./ex/aaa6.ts)',
  '├── 📄 [aaa7](./ex/aaa7.ts)',
  '</details>',
];

const newResult2 = [
  '<details> <summary>📂 [ex](./ex)</summary>',
  '├── <details> <summary>📂 [aaa](./ex/aaa)</summary>',
  '│   ├── 📄 [aaa5](./ex/aaa/aaa5.ts)',
  '│   ├── 📄 [aaa6](./ex/aaa/aaa6.ts)',
  '│   ├── 📄 [aaa7](./ex/aaa/aaa7.ts)',
  '</details>',
  '</details>',
];

const newResult3 = [
  '<details> <summary>📂 [ex](./ex)</summary>',
  '├── 📄 [aaa5](./ex/aaa5.ts)',
  '├── 📄 [aaa6](./ex/aaa6.ts)',
  '├── 📄 [aaa7](./ex/aaa7.ts)',
  '├── 📂 [aaa](./ex/aaa)',
  '</details>',
];

const newResult4 = [
  '<details> <summary>📂 [ex](./ex)</summary>',
  '├── 📄 [aaa5](./ex/aaa5.ts)',
  '├── 📂 [aaa](./ex/aaa)',
  '</details>',
  '<details> <summary>📂 [ex2](./ex2)</summary>',
  '├── 📄 [aaa6](./ex2/aaa6.ts)',
  '├── 📂 [aaa2](./ex2/aaa2)',
  '</details>',
];

describe('Generate Tree', () => {
  it(' a tree containing file,folder,3 levels,deleted folders with comment and no comments ', () => {
    const newTreeCore = generateMarkDownTree(treeCore);
    expect(newTreeCore.toString).to.equal(resultwhole.toString);
  });
  it('folders only ', () => {
    const newTreeCore = generateMarkDownTree(treeCore, FilterType.FOLDER_ONLY);
    expect(newTreeCore.toString).to.equal(resultfoldersonly.toString);
  });
  it('Root only ', () => {
    const newTreeCore = generateMarkDownTree(treeCore, FilterType.ROOT_ONLY);
    expect(newTreeCore.toString).to.equal(resultrootsonly.toString);
  });
  it('folder and 3 files', () => {
    const newTreeCore = generateMarkDownTree(newCore);
    expect(newTreeCore.toString).to.equal(newResult.toString);
  });
  it('1 Folder ,1 Folder Nested, 3 Files Nested Nested', () => {
    const newTreeCore = generateMarkDownTree(newCore2);
    expect(newTreeCore.toString).to.equal(newResult2.toString);
  });
  it('1 Folder, 3 Files Nested, 1 Folder Nested.', () => {
    const newTreeCore = generateMarkDownTree(newCore3);
    expect(newTreeCore.toString).to.equal(newResult3.toString);
  });
  it('2 Folders, 1 Folder Nested in Each, 1 File Nested in Each.', () => {
    const newTreeCore = generateMarkDownTree(newCore4);
    expect(newTreeCore.toString).to.equal(newResult4.toString);
  });
});
