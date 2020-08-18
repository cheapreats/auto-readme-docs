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

## Example Output
<big><pre>
📜 <a href="./.eslintrc.js">.eslintrc.js</a> 
📜 <a href="https://git-scm.com/docs/gitignore">ℹ️</a><a href="./.gitignore">.gitignore</a> 
📄 <a href="./LICENSE">LICENSE</a> 
📄 <a href="./README.md">README.md</a> 
📄 <a href="./package-lock.json">package-lock.json</a> 
📄 <a href="./package.json">package.json</a> 
<details><summary>📂 <a href="./public">public</a> 
</summary><blockquote>📄 <a href="./public/favicon.ico">favicon.ico</a> 
📄 <a href="./public/index.html">index.html</a> </blockquote></details>

<details><summary>📂 <a href="./src">src</a> 
</summary><blockquote>📄 <a href="./src/App.tsx">App.tsx</a> 
<details><summary>📂 <a href="./src/components">components</a> 
</summary><blockquote>📄 <a href="./src/components/BadgesSection.tsx">BadgesSection.tsx</a> 
📄 <a href="./src/components/MarkdownDisplay.tsx">MarkdownDisplay.tsx</a> 
📄 <a href="./src/components/MarkdownDisplayLine.tsx">MarkdownDisplayLine.tsx</a> 
📄 <a href="./src/components/URLBox.tsx">URLBox.tsx</a> 
<details><summary>📂 <a href="./src/components/reusable">reusable</a> 
</summary><blockquote>📄 <a href="./src/components/reusable/Card.tsx">Card.tsx</a> 
📄 <a href="./src/components/reusable/CenteredCol.tsx">CenteredCol.tsx</a> 
📄 <a href="./src/components/reusable/CustomButton.tsx">CustomButton.tsx</a> 
📄 <a href="./src/components/reusable/CustomSecondaryButton.tsx">CustomSecondaryButton.tsx</a> 
📄 <a href="./src/components/reusable/Input.tsx">Input.tsx</a> </blockquote></details></blockquote></details>

<details><summary>📂 <a href="./src/images">images</a> 
</summary><blockquote>📄 <a href="./src/images/Demo.gif">Demo.gif</a> </blockquote></details>

📄 <a href="./src/index.css">index.css</a> 
📄 <a href="./src/index.tsx">index.tsx</a> 
📄 <a href="./src/react-app-env.d.ts">react-app-env.d.ts</a> 
<details><summary>📂 <a href="./src/tree">tree</a> 
</summary><blockquote>📄 <a href="./src/tree/constants.ts">constants.ts</a> 
📄 <a href="./src/tree/index.ts">index.ts</a> 
📄 <a href="./src/tree/types.ts">types.ts</a> </blockquote></details>

<details><summary>📂 <a href="./src/utils">utils</a> 
</summary><blockquote>📄 <a href="./src/utils/repoToBadge.ts">repoToBadge.ts</a> </blockquote></details></blockquote></details>

📄 <a href="https://www.typescriptlang.org/">ℹ️</a><a href="./tsconfig.json">tsconfig.json</a> 
</pre></big>
