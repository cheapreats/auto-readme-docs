export const symbols = {
  branch: '├── ',
  vertical: '│   ',
};

const commentLeader = '#';
const srcDirComment = `${commentLeader} Source files`;
const testDirComment = `${commentLeader} Test functions and procedures (often run automatically)`;
const toolsDirComment = `${commentLeader} Miscellaneous helpers and utilities`;
const docDirComment = `${commentLeader} Documentation files`;
const binDirComment = `${commentLeader} Compiled files, or standalone executables`;
const assetsDirComment = `${commentLeader} Supplemental assets or resources, or static files`;

export const commonDirComments: Record<string, string> = {
  // src dir variants
  src: srcDirComment,
  lib: srcDirComment,
  app: srcDirComment,
  pkg: srcDirComment,

  // test dir variants
  test: testDirComment,
  tests: testDirComment,
  spec: testDirComment,

  // tools dir variants
  tools: toolsDirComment,
  tool: toolsDirComment,
  util: toolsDirComment,

  // doc dir variants
  doc: docDirComment,
  docs: docDirComment,

  // bin dir variants
  bin: binDirComment,
  build: binDirComment,
  cmd: binDirComment,
  dist: binDirComment,

  // assets dir variants
  assets: assetsDirComment,
  asset: assetsDirComment,
  public: assetsDirComment,
};
