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
const exampleDirComment = `${commentLeader} "Real world" examples that demonstrate how this project may be used`;
const scriptDirComment = `${commentLeader} Small runnables (typically shell scripts) that perform routine tasks`;
const vscodeDirComment = `${commentLeader} Configurations for Visual Studio Code users`;
const circleciDirComment = `${commentLeader} Configurations for CI/CD jobs on the CircleCI platform`;
const githubDirComment = `${commentLeader} Markdown files that GitHub looks for, like changelogs and issue templates`;
const androidDirComment = `${commentLeader} Native code generated for the Android platform`;
const iosDirComment = `${commentLeader} Native code generated for the iOS platform`;

export const commonDirComments: Record<string, string> = {
  // src dir variants
  src: srcDirComment,
  lib: srcDirComment,
  app: srcDirComment,
  pkg: srcDirComment,
  packages: srcDirComment,

  // test dir variants
  test: testDirComment,
  tests: testDirComment,
  spec: testDirComment,
  e2e: testDirComment,
  jest: testDirComment,

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

  // example dir variants
  example: exampleDirComment,
  examples: exampleDirComment,
  guide: exampleDirComment,

  // script dir variants
  script: scriptDirComment,
  scripts: scriptDirComment,

  // android dir variants
  android: androidDirComment,

  // ios dir variants
  ios: iosDirComment,

  // .vscode dir variants
  '.vscode': vscodeDirComment,

  // .circleci dir variants
  '.circleci': circleciDirComment,

  // .github dir variants
  '.github': githubDirComment,
};
