import { deleteFileFromPath } from './deleteFileFromPath';

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
            comment: "",
            treeCore: [],
          },
          {
            path: 'src/images',
            deletedOrder: -1,
            comment: "",
            treeCore: [
              {
                path: 'src/images/Demo.gif',
                deletedOrder: -1,
                comment: "",
                treeCore: [],
              },
            ],
          },
          {
            path: 'src/tree',
            deletedOrder: -1,
            comment: "",
            treeCore: [],
          },
          {
            path: 'src/utils',
            deletedOrder: -1,
            comment: "",
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
            comment: "",
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

deleteFileFromPath(treeCore, 'public/index.html');
deleteFileFromPath(treeCore, 'public/favicon.ico');
console.log(treeCore[0].treeCore[1].treeCore[1]);
console.log(treeCore[0].treeCore[1].treeCore[0]);
