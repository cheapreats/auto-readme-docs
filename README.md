
# Table Of Contents
   * [Table Of Contents](#Table-Of-Contents)
   * [Automatic Project Structures for README's](#Automatic-Project-Structures-for-README's)
     * [Description](#Description)
     * [Architecture](#Architecture)
     * [How it Works](#How-it-Works)
       * [WHY](#WHY)
         * [Major Issues](#Major-Issues)
         * [Minor Issues](#Minor-Issues)
   * [Technologies](#Technologies)
   * [Authors Table](#Authors-Table)
   * [Config Values](#Config-Values)
     * [Example Output](#Example-Output)
   
# Automatic Project Structures for README's

## Description
A web application that helps automate README creation

## Architecture
Read: https://github.com/MLH-Fellowship/0.2.1-readme-dirs/wiki/Tree-Core-Architecure

## How it Works
Head to [URL](https://project-structure-readme.netlify.app/) and type in your Github Project URL and watch a MarkDown Accessible README with pre-filled descriptions appear!
With a one-click Copy/Paste you can update your README with the best MarkDown Project Structure README's you've ever seen!
```Example Github Project URL: https://github.com/MLH-Fellowship/0.2.1-readme-dirs```

![Project demo](./src/images/updatedDemo.gif)

### WHY
We built this tool two solve two major issues and two minor issues:
#### Major Issues
1) README's don't contain project structures which make it difficult for contributors to understand where everything is and how what's happening inside the repository.
2) Existing Project Structures don't have hyperlinks making the UX of a project structure a bit difficult to navigate with excessive scrolling or third party plugins to extend the functionality. This requires no third-party software and can be done right in Github natively!
#### Minor Issues
1) You can plug in any repo you want to contribute to and completely understand what every folder does thanks to auto generated documentation!
2) You can attach Badges to your repository to help people find the correct NPM Package your repository references!

# Technologies
- [React](https://reactjs.org/) - To Build out the front-end application
- [Github V3 REST API](https://developer.github.com/v3/) - To pull Tree Structures from Github Repositories
- [JavaScript (ES6)](https://www.javascript.com/) - To execute API Requests
- [TypeScript](https://www.typescriptlang.org/)
- [Styled Components (CSS-IN-JS Framework)](http://styled-components.com/)
- [HTML](https://www.w3schools.com/html/html_intro.asp)
- [CSS](https://www.w3schools.com/css/)
- [Babel](https://babeljs.io/)

# Authors Table

<table><tr><td align=center><a href=https://github.com/sahandfarahani><img src=https://avatars0.githubusercontent.com/u/58839234?v=4width=100px;/></a><br /><a href=https://github.com/sahandfarahani><sub><b>sahandfarahani</b></sub></a><br /><br /><br />Contributions:  180<br />Public Repos:  10<br /><a href=undefined>🐦</a></td><td align=center><a href=https://github.com/Manpreet-Bhatti><img src=https://avatars0.githubusercontent.com/u/13394848?v=4width=100px;/></a><br /><a href=https://github.com/Manpreet-Bhatti><sub><b>Manpreet-Bhatti</b></sub></a><br /><br />Brampton, Ontario<br />Contributions:  150<br />Public Repos:  10<br /><a href=undefined>🐦</a></td><td align=center><a href=https://github.com/ralph-dev><img src=https://avatars2.githubusercontent.com/u/7469722?v=4width=100px;/></a><br /><a href=https://github.com/ralph-dev><sub><b>ralph-dev</b></sub></a><br /><br />Toronto<br />Contributions:  32<br />Public Repos:  62<br /><a href=undefined>🐦</a></td><td align=center><a href=https://github.com/nchaloult><img src=https://avatars0.githubusercontent.com/u/31291920?v=4width=100px;/></a><br /><a href=https://github.com/nchaloult><sub><b>nchaloult</b></sub></a><br /><br />Atlanta, GA<br />Contributions:  30<br />Public Repos:  20<br /><a href=undefined>🐦</a></td><td align=center><a href=https://github.com/mohammedsahl><img src=https://avatars0.githubusercontent.com/u/32067562?v=4width=100px;/></a><br /><a href=https://github.com/mohammedsahl><sub><b>mohammedsahl</b></sub></a><br /><br />Waterloo, Canada<br />Contributions:  18<br />Public Repos:  21<br /><a href=undefined>🐦</a></td></tr><tr><td align=center><a href=https://github.com/dangnhathuy><img src=https://avatars0.githubusercontent.com/u/62954674?v=4width=100px;/></a><br /><a href=https://github.com/dangnhathuy><sub><b>dangnhathuy</b></sub></a><br /><br /><br />Contributions:  7<br />Public Repos:  5<br /><a href=undefined>🐦</a></td></table>

# Config Values
| Configuration       | Type                                                                                                    | Default Value   | Description                                   |
|---------------------|---------------------------------------------------------------------------------------------------------|-----------------|-----------------------------------------------|
| CollapsibleFolder   | Boolean                                                                                                 | true            | Make folders collapsible                      |
| RegexKeyword        | String                                                                                                  | 'Preview'       | Gets the comment in form of @keyword{comment} |
| Filter              | FilterType {<br>NULL,<br>ROOT_ONLY,<br>FOLDER_ONLY}                                                     | FilterType.NULL | Generate the tree through a filter            |
| AuthorConfigs       | {onlyOwner:boolean, AuthorInfo:Authorinfo,TableDesign:TableDesign}                                      | onlyOwner=false | If we only want owner info and which infos    |
| TableDesign         | {VERTICAL, CELL_DESIGN}                                                                                 | VERTICAL       | Design Style of Table                            |
| AuthorInfo          | WithName,WithPicture,WithContributions,WithEmail,<br>WithLocation,WithTwitterUsername,WithNumberOfRepos |                 | Which Information of Authors to show          |
| WithName            | Boolean                                                                                                 | true            | Authors Login Name                            |
| WithPicture         | Boolean                                                                                                 | true            | Authors Picture                               |
| WithContributions   | Boolean                                                                                                 | true            | Number of Author's Contributions              |
| WithEmail           | Boolean                                                                                                 | false           | Authors Email                                 |
| WithLocation        | Boolean                                                                                                 | false           | Authors Location                              |
| WithTwitterUsername | Boolean                                                                                                 | false           | Authors Twitter Link                          |
| WithNumberOfRepos   | Boolean                                                                                                 | false           | Authors public Repo Number                    |
| GooglePlayLink      | String                                                                                                  | ""              | GooglePlay Link URL                           |
| IOSStoreLink        | String                                                                                                  | ""              | IOS Store Link URL                            |
| WithTableOfContent  | boolean                                                                                                  | true              | is there Table of Content?               |


## Example Output

<big><pre>
<summary>⚙️ <a href="https://eslint.org/">ℹ️</a> <a href="./.eslintrc.js">.eslintrc.js</a> </summary>
<details><summary>📂 <a href="./.github">.github</a> </summary>
<blockquote>📄 <a href="./.github/FUNDING.yml">FUNDING.yml</a> <br /></blockquote></details><summary>⚙️ <a href="https://git-scm.com/docs/gitignore">ℹ️</a> <a href="./.gitignore">.gitignore</a> </summary>
<summary>⚖️ <a href="./LICENSE">LICENSE</a> </summary>
<summary>📜 <a href="./README.md">README.md</a> </summary>
<summary>📄 <a href="https://docs.npmjs.com/configuring-npm/package-lock-json.html">ℹ️</a> <a href="./package-lock.json">package-lock.json</a> </summary>
<summary>📄 <a href="https://docs.npmjs.com/files/package.json">ℹ️</a> <a href="./package.json">package.json</a> </summary>
<details><summary>📂 <a href="./public">public</a> </summary>
<blockquote>📄 <a href="./public/favicon.ico">favicon.ico</a> <br />
<summary>📄 <a href="./public/index.html">index.html</a> </summary></blockquote></details><details><summary>📂 <a href="./src">src</a> </summary>
<blockquote>📄 <a href="./src/App.tsx">App.tsx</a> <br />
<details><summary>📂 <a href="./src/components">components</a> </summary>
<blockquote>📄 <a href="./src/components/BadgesSection.tsx">BadgesSection.tsx</a> <br />
<summary>📄 <a href="./src/components/CommentSection.tsx">CommentSection.tsx</a> </summary>
<summary>📄 <a href="./src/components/MarkdownDisplay.tsx">MarkdownDisplay.tsx</a> </summary>
<summary>📄 <a href="./src/components/MarkdownDisplayLine.tsx">MarkdownDisplayLine.tsx</a> </summary>
<summary>📄 <a href="./src/components/URLBox.tsx">URLBox.tsx</a> </summary>
<details><summary>📂 <a href="./src/components/reusable">reusable</a> </summary>
<blockquote>📄 <a href="./src/components/reusable/Card.tsx">Card.tsx</a> <br />
<summary>📄 <a href="./src/components/reusable/CenteredCol.tsx">CenteredCol.tsx</a> </summary>
<summary>📄 <a href="./src/components/reusable/CustomButton.tsx">CustomButton.tsx</a> </summary>
<summary>📄 <a href="./src/components/reusable/CustomSecondaryButton.tsx">CustomSecondaryButton.tsx</a> </summary>
<summary>📄 <a href="./src/components/reusable/Input.tsx">Input.tsx</a> </summary>
<summary>📄 <a href="./src/components/reusable/TextArea.tsx">TextArea.tsx</a> </summary></blockquote></details></blockquote></details><details><summary>📂 <a href="./src/images">images</a> </summary>
<blockquote>📄 <a href="./src/images/Demo.gif">Demo.gif</a> <br />
<summary>📄 <a href="./src/images/updatedDemo.gif">updatedDemo.gif</a> </summary></blockquote></details><summary>📄 <a href="./src/index.css">index.css</a> </summary>
<summary>📄 <a href="./src/index.tsx">index.tsx</a> </summary>
<summary>📄 <a href="./src/react-app-env.d.ts">react-app-env.d.ts</a> </summary>
<details><summary>📂 <a href="./src/tree">tree</a> </summary>
<blockquote>📄 <a href="./src/tree/constants.ts">constants.ts</a> <br />
<summary>📄 <a href="./src/tree/index.ts">index.ts</a> </summary>
<summary>📄 <a href="./src/tree/languageWebsites.ts">languageWebsites.ts</a> </summary>
<summary>📄 <a href="./src/tree/types.ts">types.ts</a> </summary></blockquote></details><details><summary>📂 <a href="./src/utils">utils</a> </summary>
<blockquote>📄 <a href="./src/utils/Switch.tsx">Switch.tsx</a> <br />
<details><summary>📂 <a href="./src/utils/createNpmFormatting">createNpmFormatting</a> </summary>
<blockquote>📄 <a href="./src/utils/createNpmFormatting/createNpmFormatting.ts">createNpmFormatting.ts</a> <br />
<summary>📄 <a href="./src/utils/createNpmFormatting/createNpmFormattingTest.ts">createNpmFormattingTest.ts</a> </summary></blockquote></details><summary>📄 <a href="./src/utils/deepCopyFunction.ts">deepCopyFunction.ts</a> </summary>
<details><summary>📂 <a href="./src/utils/deleteFileFromPath">deleteFileFromPath</a> </summary>
<blockquote>📄 <a href="./src/utils/deleteFileFromPath/deleteFileFromPath.ts">deleteFileFromPath.ts</a> <br />
<summary>📄 <a href="./src/utils/deleteFileFromPath/deleteFileFromPathTest.ts">deleteFileFromPathTest.ts</a> </summary></blockquote></details><summary>📄 <a href="./src/utils/extractString.ts">extractString.ts</a> </summary>
<summary>📄 <a href="./src/utils/filterChange.ts">filterChange.ts</a> </summary>
<details><summary>📂 <a href="./src/utils/formatLanguages">formatLanguages</a> </summary>
<blockquote>📄 <a href="./src/utils/formatLanguages/formatLanguages.ts">formatLanguages.ts</a> <br />
<summary>📄 <a href="./src/utils/formatLanguages/formatLanguagesTest.ts">formatLanguagesTest.ts</a> </summary></blockquote></details><summary>📄 <a href="./src/utils/generateCoreTest.ts">generateCoreTest.ts</a> </summary>
<details><summary>📂 <a href="./src/utils/generateMarkDownTree">generateMarkDownTree</a> </summary>
<blockquote>📄 <a href="./src/utils/generateMarkDownTree/generateMarkDownTree.ts">generateMarkDownTree.ts</a> <br />
<summary>📄 <a href="./src/utils/generateMarkDownTree/generateMarkDownTreeTest.ts">generateMarkDownTreeTest.ts</a> </summary></blockquote></details><details><summary>📂 <a href="./src/utils/getAutoGeneratedCommentForPath">getAutoGeneratedCommentForPath</a> </summary>
<blockquote>📄 <a href="./src/utils/getAutoGeneratedCommentForPath/getAutoGeneratedCommentForPath.ts">getAutoGeneratedCommentForPath.ts</a> <br />
<summary>📄 <a href="./src/utils/getAutoGeneratedCommentForPath/getAutoGeneratedCommentForPathtest.ts">getAutoGeneratedCommentForPathtest.ts</a> </summary></blockquote></details><summary>📄 <a href="./src/utils/getBuiltinComment.ts">getBuiltinComment.ts</a>           <span> # ";
const END_OF_FILE_COMMENT_PATTERN =</span></summary>
<details><summary>📂 <a href="./src/utils/getCopyToClipboardContents">getCopyToClipboardContents</a> </summary>
<blockquote>📄 <a href="./src/utils/getCopyToClipboardContents/getCopyToClipboardContents.ts">getCopyToClipboardContents.ts</a> <br />
<summary>📄 <a href="./src/utils/getCopyToClipboardContents/getCopyToClipboardContentsTest.ts">getCopyToClipboardContentsTest.ts</a> </summary></blockquote></details><summary>📄 <a href="./src/utils/getCoreFromTree.ts">getCoreFromTree.ts</a> </summary>
<details><summary>📂 <a href="./src/utils/getFileIconFromFileType">getFileIconFromFileType</a> </summary>
<blockquote>📄 <a href="./src/utils/getFileIconFromFileType/getFileIconFromFileType.ts">getFileIconFromFileType.ts</a> <br />
<summary>📄 <a href="./src/utils/getFileIconFromFileType/getFileIconFromFileTypeTest.ts">getFileIconFromFileTypeTest.ts</a> </summary></blockquote></details><details><summary>📂 <a href="./src/utils/getFileTypeFromPath">getFileTypeFromPath</a> </summary>
<blockquote>📄 <a href="./src/utils/getFileTypeFromPath/getFileTypeFromPath.ts">getFileTypeFromPath.ts</a> <br />
<summary>📄 <a href="./src/utils/getFileTypeFromPath/getFileTypeFromPathTest.ts">getFileTypeFromPathTest.ts</a> </summary></blockquote></details><details><summary>📂 <a href="./src/utils/getHyperLinkFromPath">getHyperLinkFromPath</a> </summary>
<blockquote>📄 <a href="./src/utils/getHyperLinkFromPath/getHyperLinkFromPath.ts">getHyperLinkFromPath.ts</a> <br />
<summary>📄 <a href="./src/utils/getHyperLinkFromPath/getHyperLinkFromPathtest.ts">getHyperLinkFromPathtest.ts</a> </summary></blockquote></details><summary>📄 <a href="./src/utils/getInfoLinks.ts">getInfoLinks.ts</a> </summary>
<details><summary>📂 <a href="./src/utils/getLargestFileNameLengthInPath">getLargestFileNameLengthInPath</a> </summary>
<blockquote>📄 <a href="./src/utils/getLargestFileNameLengthInPath/getLargestFileNameLengthInLevel.ts">getLargestFileNameLengthInLevel.ts</a> <br />
<summary>📄 <a href="./src/utils/getLargestFileNameLengthInPath/getLargestFileNameLengthInLevelTest.ts">getLargestFileNameLengthInLevelTest.ts</a> </summary></blockquote></details><details><summary>📂 <a href="./src/utils/getOwnerAndRepoFromUrl">getOwnerAndRepoFromUrl</a> </summary>
<blockquote>📄 <a href="./src/utils/getOwnerAndRepoFromUrl/getOwnerAndRepoFromUrl.ts">getOwnerAndRepoFromUrl.ts</a> <br />
<summary>📄 <a href="./src/utils/getOwnerAndRepoFromUrl/getOwnerAndRepoFromUrlTest.ts">getOwnerAndRepoFromUrlTest.ts</a> </summary></blockquote></details><summary>📄 <a href="./src/utils/getPreviousTree.ts">getPreviousTree.ts</a> </summary>
<summary>📄 <a href="./src/utils/getWebsiteForLanguage.ts">getWebsiteForLanguage.ts</a> </summary>
<details><summary>📂 <a href="./src/utils/repoToBadge">repoToBadge</a> </summary>
<blockquote>📄 <a href="./src/utils/repoToBadge/repoToBadge.ts">repoToBadge.ts</a> <br />
<summary>📄 <a href="./src/utils/repoToBadge/repoToBadgeTest.ts">repoToBadgeTest.ts</a> </summary></blockquote></details><details><summary>📂 <a href="./src/utils/selectFoldersOnly">selectFoldersOnly</a> </summary>
<blockquote>📄 <a href="./src/utils/selectFoldersOnly/selectFoldersOnly.ts">selectFoldersOnly.ts</a> <br />
<summary>📄 <a href="./src/utils/selectFoldersOnly/selectFoldersOnlyTest.ts">selectFoldersOnlyTest.ts</a> </summary></blockquote></details><details><summary>📂 <a href="./src/utils/selectRootCores">selectRootCores</a> </summary>
<blockquote>📄 <a href="./src/utils/selectRootCores/SelectRootCoresTest.ts">SelectRootCoresTest.ts</a> <br />
<summary>📄 <a href="./src/utils/selectRootCores/selectRootCores.ts">selectRootCores.ts</a> </summary></blockquote></details><details><summary>📂 <a href="./src/utils/setCommentForPath">setCommentForPath</a> </summary>
<blockquote>📄 <a href="./src/utils/setCommentForPath/setCommentForPath.ts">setCommentForPath.ts</a> <br />
<summary>📄 <a href="./src/utils/setCommentForPath/setCommentForPathtest.ts">setCommentForPathtest.ts</a> </summary></blockquote></details><summary>📄 <a href="./src/utils/tagWrap.ts">tagWrap.ts</a> </summary>
<details><summary>📂 <a href="./src/utils/undoDeletions">undoDeletions</a> </summary>
<blockquote>📄 <a href="./src/utils/undoDeletions/undoDeletions.ts">undoDeletions.ts</a> <br />
<summary>📄 <a href="./src/utils/undoDeletions/undoDeletionsTest.ts">undoDeletionsTest.ts</a> </summary></blockquote></details></blockquote></details></blockquote></details><summary>📄 <a href="https://www.typescriptlang.org/">ℹ️</a> <a href="./tsconfig.json">tsconfig.json</a> </summary>
</pre></big>
