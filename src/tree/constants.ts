export const symbols = {
  branch: "├── ",
  vertical: "│   ",
};

const commentLeader = "#";
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

const babelLink = "https://babeljs.io/";
const buckbuildLink = "https://buck.build/";
const buildspecLink =
  "https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html";
const cypressLink = "https://www.cypress.io/";
const dockerLink = "https://docs.docker.com/";
const dockerrunLink =
  "https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/single-container-docker-configuration.html";
const dotEnvLink = "https://www.npmjs.com/package/dotenv";
const ecosystemLink =
  "https://pm2.keymetrics.io/docs/usage/application-declaration/";
const editorconfigLink = "https://editorconfig.org/";
const envvarsLink =
  "https://create-react-app.dev/docs/adding-custom-environment-variables/";
const eslintignoreLink = "https://eslint.org/docs/user-guide/configuring";
const esLintLink = "https://eslint.org/";
const flowconfig = "https://flow.org/en/";
const gatsbyLink = "https://www.gatsbyjs.com/";
const gemfileLink = "https://bundler.io/rationale.html";
const gitattributesLink = "https://git-scm.com/docs/gitattributes";
const gitIgnoreLink = `https://git-scm.com/docs/gitignore`;
const gulpfileLink = "https://gulpjs.com/";
const jestjsLink = "https://jestjs.io/en/";
const jsdocLink = "https://jsdoc.app/";
const manifestLink =
  "https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json";
const materializeLink = "https://materializecss.com/";
const metroLink = "https://facebook.github.io/metro/";
const nodemonLink = "https://www.npmjs.com/package/nodemon";
const npmdebugLink =
  "https://docs.npmjs.com/generating-and-locating-npm-debug-log-files";
const npmhuskyLink = "https://www.npmjs.com/package/husky/v/3.0.0";
const npmLink = "https://docs.npmjs.com/";
const npmrcLink = "https://docs.npmjs.com/configuring-npm/npmrc.html";
const npmrunworkerLink = "https://www.npmjs.com/package/runworker";
const npmschedulerLink = "https://www.npmjs.com/package/scheduler";
const packagejsonLink = "https://docs.npmjs.com/files/package.json";
const packagelockjsonLink =
  "https://docs.npmjs.com/configuring-npm/package-lock-json.html";
const prettierconfLink = "https://prettier.io/docs/en/configuration.html";
const prettierignoreLink = "https://prettier.io/docs/en/ignore.html";
const prettierLink = "https://prettier.io/";
const remotedebugLink =
  "https://nodejs.org/en/docs/guides/debugging-getting-started/";
const rundotshLink = "http://run.sh/";
const serverjsLink = "https://serverjs.io/";
const shrinkwrapLink =
  "https://docs.npmjs.com/configuring-npm/shrinkwrap-json.html";
const travisLink = "https://travis-ci.com/";
const tsConfigLink = `https://www.typescriptlang.org/`;
const tslintLink = "https://palantir.github.io/tslint/";
const watchmanLink = "https://facebook.github.io/watchman/";
const webpackLink = "https://webpack.js.org/";
const yeomanLink = "https://yeoman.io/authoring/storage.html";

export const commonInfoLinks: Record<string, string> = {
  "ecosystem.config.js": ecosystemLink,
  "nodemon.json": nodemonLink,
  "tslint.build.json": tslintLink,
  "tslint.json": tslintLink,
  "npm-shrinkwrap.json": shrinkwrapLink,
  "run.sh": rundotshLink,
  ".editorconfig": editorconfigLink,
  "Gemfile.lock": gemfileLink,
  "npm-debug.log": npmdebugLink,
  "manifest.json": manifestLink,
  "materialize.css": materializeLink,
  ".flowconfig": flowconfig,
  ".dockerignore": dockerLink,
  "docker-compose.yml": dockerLink,
  "Dockerrun.aws.json": dockerrunLink,
  "buildspec.yml": buildspecLink,
  "server.js": serverjsLink,
  "webpack.config.js": webpackLink,
  ".npmignore": npmLink,
  ".buckconfig": buckbuildLink,
  ".env.development": envvarsLink,
  ".env.production": envvarsLink,
  "RunWorker.js": npmrunworkerLink,
  "Scheduler.js": npmschedulerLink,
  ".npmrc": npmrcLink,
  ".yo-rc.json": yeomanLink,
  "remoteDebug.js": remotedebugLink,
  ".eslintignore": eslintignoreLink,
  ".gitattributes": gitattributesLink,
  ".travis.yml": travisLink,
  ".watchmanconfig": watchmanLink,
  "babel.config.js": babelLink,
  ".babelrc": babelLink,
  "jest.config.js": jestjsLink,
  "unittest-jest.config.js": jestjsLink,
  "metro.config.js": metroLink,
  "gulpfile.js": gulpfileLink,
  "jsdoc.json": jsdocLink,
  "jsdoc.conf.json": jsdocLink,
  "gatsby-browser.js": gatsbyLink,
  "gatsby-config.js": gatsbyLink,
  "gatsby-node.js": gatsbyLink,
  "gatsby-ssr.js": gatsbyLink,
  "tsconfig.json": tsConfigLink,
  ".gitignore": gitIgnoreLink,
  ".eslintrc.js": esLintLink,
  ".eslintrc": esLintLink,
  ".env": dotEnvLink,
  ".huskyrc.js": npmhuskyLink,
  ".prettierrc": prettierLink,
  ".prettierrc.json": prettierconfLink,
  ".prettierignore": prettierignoreLink,
  "cypress.json": cypressLink,
  "package-lock.json": packagelockjsonLink,
  "package.json": packagejsonLink,
};

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
  ".vscode": vscodeDirComment,

  // .circleci dir variants
  ".circleci": circleciDirComment,

  // .github dir variants
  ".github": githubDirComment,
};
