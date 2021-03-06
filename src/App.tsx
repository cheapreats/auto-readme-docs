import React, { useState, useEffect } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styled from "styled-components";
import { ripOutPaths } from "./tree";
import {
  GithubAPIResponseBody,
  NpmsResponseBody,
  GithubData,
  Core,
  pathAndComment,
  LinkedImageType,
} from "./tree/types";
import {
  useConfigurationContext,
  useConfigurationActions,
  initialState,
} from "./contexts/configuration/ConfigurationContext";
import MarkdownDisplay from "./components/MarkdownDisplay";
import BadgesSection from "./components/BadgesSection";
import URLBox from "./components/URLBox";
import AuthorsSection from "./components/AuthorsSection";
import { formatLanguages } from "./utils/formatLanguages/formatLanguages";
import CustomSecondaryButton from "./components/reusable/CustomSecondaryButton";
import CenteredCol from "./components/reusable/CenteredCol";
import Card from "./components/reusable/Card";
import getPreviousTree from "./utils/getPreviousTree";
import tagWrap from "./utils/tagWrap";
import generateCommandTable from "./utils/generateCommandTable";
import asyncForEach from "./utils/asyncForEach";
import { updateConfig } from "./utils/updateConfig";
import createTOC from "./utils/createTOC";
import TOCSection from "./components/TOCSection";
import LicenseSection from "./components/LicenseSection";
import LinkedImageSection from "./components/LinkedImageSection";
import GetAlternateColorRow from "./components/reusable/getAlternateColorRow";

const App: React.FC = () => {
  const [repoName, setRepoName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [license, setLicense] = useState("");
  const [repoLanguages, setRepoLanguages] = useState<string[]>([]);
  const [contributors, setContributors] = useState<object[]>([]);
  const [backers, setBackers] = useState<LinkedImageType[]>([]);
  const [sponsors, setSponsors] = useState<LinkedImageType[]>([]);
  const [isNpmBadgeVisible, setNpmBadgeVisible] = useState(false);
  const [url, setURL] = useState("");
  const [treeCore, setTreeCore] = useState<Core[]>([]);
  const [configState, configDispatch] = useConfigurationContext();
  const [tableOfContent, setTableOfContent] = useState<string[]>([]);
  const [tableOfCommands, setTableOfCommands] = useState<string>("");
  const BACKERS_HEADER = "Backers";
  const SPONSORS_HEADER = "Sponsors";

  const OWNER_IN_URL = 3;
  const REPO_IN_URL = 4;
  const README_PATH = "README.md";
  const PACKAGEJSON_PATH = "package.json";
  const README_CONFIG_PATH = "readme.config.js";
  const COMMENTS_EXIST_REGEX = /(<a href=".+">.github<\/a>).+(<span># .+<\/span>)/g;
  const IS_FILE = "blob";
  const CONTENT_FIELD = "content";
  const GITHUB_API_URL_PREFIX = "https://api.github.com/repos/";
  const GITHUB_API_USER_PREFIX = "https://api.github.com/users/";
  const GITHUB_API_COMMITS_ON_MASTER_SUFFIX = "/commits/master";
  const GITHUB_API_CONTENTS_SUFFIX = "/contents";
  const GITHUB_API_BLOBS_SUFFIX = "/git/blobs";
  const GITHUB_API_TREES_SUFFIX = "/git/trees";
  const GITHUB_API_TREES_LANGUAGES = "/languages";
  const GITHUB_API_TREES_CONTRIBUTORS = "/contributors";
  const GITHUB_API_LICENSES_PREFIX = "license";
  const GITHUB_API_LICENSES = "https://api.github.com/licenses/";
  const BODY_FIELD = "body";
  const URL_FIELD = "url";
  const WITH_RECURSIVE_PARAMETER = "?recursive=true";
  const NPM_API_VERSION2 = "https://api.npms.io/v2";
  const EXAMPLE_URL = "https://github.com/cheapreats/auto-readme-docs";
  // To make text larger / more readable comment
  const BIG_TAG = "<big>";
  // To give horizontal scrolling on small devices
  const PRE_TAG = "<pre>";
  const GOOGLEPLAY_BADGE =
    "https://lh3.googleusercontent.com/cjsqrWQKJQp9RFO7-hJ9AfpKzbUb_Y84vXfjlP0iRHBvladwAfXih984olktDhPnFqyZ0nu9A5jvFwOEQPXzv7hr3ce3QVsLN8kQ2Ao=s0";
  const IOSSTORE_BADGE =
    "https://developer.apple.com/app-store/marketing/guidelines/images/badge-download-on-the-app-store.svg";

  let config = initialState;
  useEffect(() => {
    const setAsyncData = (list, stateSetter) => {
      let detailsArray = new Array();
      asyncForEach(list, async (item) => {
        await fetch(`${GITHUB_API_USER_PREFIX}${item}`)
          .then((response) => response.json())
          .then((data) => {
            const itemDetail = {
              name: data.login,
              image: data.avatar_url,
              url: data.html_url,
            };
            detailsArray.push(itemDetail);
          });
      }).then(() => stateSetter(detailsArray));
    };

    setAsyncData(config.Backers, setBackers);
    setAsyncData(config.Sponsors, setSponsors);
  }, [config.Backers, config.Sponsors]);

  const handleExampleGoButtonPress = async () => {
    const pathArray = EXAMPLE_URL.split("/");
    const owner = pathArray[OWNER_IN_URL];
    const repo = pathArray[REPO_IN_URL];
    setRepoName(repo);
    await makeRequest(owner, repo);
  };

  /** Updates the URL state when the content of URLBOX changes
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event
   */
  const handleURLChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setURL(e.target.value);

  /**  Gets the owner and repository names out of url with every click
   * and pesses them into make-request function
   * @param {MouseEvent} event - The click event
   */
  const handleGoButtonPress = async (event: MouseEvent) => {
    // Expecting a URL like 'https://github.com/${owner}/${repo}'
    const pathArray = url.split("/");
    const owner = pathArray[OWNER_IN_URL];
    const repo = pathArray[REPO_IN_URL];
    config.APPLICATION_NAME = repo;
    setRepoName(repo);
    setOwnerName(owner);
    await makeRequest(owner, repo);
  };

  /**  Given the owner and repository names makes requests to API
   * @param {String} owner - Name of the owner of repository
   * @param {String} repo - Title of the Repository
   */

  const makeRequest = async (owner: string, repo: string) => {
    let oldTree: pathAndComment[] | null = null;
    const builtInComments: pathAndComment[] = [];

    try {
      const res = await fetch(
        `${GITHUB_API_URL_PREFIX}${owner}/${repo}${GITHUB_API_CONTENTS_SUFFIX}`
      );
      const resJSON = await res.json();
      for (const key in resJSON) {
        const file = resJSON[key];
        const filePath = file[GithubData.PATH];
        if (filePath === README_CONFIG_PATH) {
          const SHA = file[GithubData.SHA];
          const blobs = await fetch(
            `${GITHUB_API_URL_PREFIX}${owner}/${repo}${GITHUB_API_BLOBS_SUFFIX}/${SHA}`
          );
          const blobsJSON = await blobs.json();
          const decodedBlobs = atob(blobsJSON[GithubData.CONTENT]);

          config = updateConfig(decodedBlobs, config);
          try {
            await configDispatch({
              type: useConfigurationActions.UPDATE_STATE,
              payload: config,
            });
          } catch (e) {
            console.log("ERROR! :", e);
          }
        }
      }
    } catch (error) {
      alert(`Error${error}`);
    }

    try {
      const res = await fetch(
        `${GITHUB_API_URL_PREFIX}${owner}/${repo}${GITHUB_API_CONTENTS_SUFFIX}`
      );
      const resJSON = await res.json();
      for (const key in resJSON) {
        const file = resJSON[key];
        const filePath = file[GithubData.PATH];
        if (filePath === README_PATH) {
          const SHA = file[GithubData.SHA];
          const blobs = await fetch(
            `${GITHUB_API_URL_PREFIX}${owner}/${repo}${GITHUB_API_BLOBS_SUFFIX}/${SHA}`
          );
          const blobsJSON = await blobs.json();
          const decodedBlobs = atob(blobsJSON[GithubData.CONTENT]);
          if (config.WithTableOfContent) {
            setTableOfContent(createTOC(decodedBlobs));
          }
          const haveComments = decodedBlobs.match(COMMENTS_EXIST_REGEX);
          oldTree = getPreviousTree(haveComments);
        }

        if (config.IncludePackageCommands) {
          if (filePath === PACKAGEJSON_PATH) {
            const SHA = file[GithubData.SHA];
            const blobs = await fetch(
              `${GITHUB_API_URL_PREFIX}${owner}/${repo}${GITHUB_API_BLOBS_SUFFIX}/${SHA}`
            );
            const blobsJSON = await blobs.json();
            const decodedBlobs = atob(blobsJSON[GithubData.CONTENT]);
            setTableOfCommands(generateCommandTable(decodedBlobs));
          }
        }
      }
    } catch (error) {
      alert(`Error${error}`);
    }

    // npm badges
    try {
      const npmPackagesResponse = await fetch(
        `${NPM_API_VERSION2}/search?q=${repo}`
      );
      const npmPackagesResponseJSON = (await npmPackagesResponse.json()) as NpmsResponseBody;
      if (npmPackagesResponseJSON.total === 0) {
        setNpmBadgeVisible(false);
      } else {
        setNpmBadgeVisible(true);
      }
    } catch (e) {
      setNpmBadgeVisible(false);
    }

    // Tree structure
    try {
      const res = await fetch(
        `${GITHUB_API_URL_PREFIX}${owner}/${repo}${GITHUB_API_COMMITS_ON_MASTER_SUFFIX}`
      );
      const resJSON = await res.json();
      const treeSHA =
        resJSON[GithubData.COMMIT][GithubData.TREE][GithubData.SHA];
      const treeRes = await fetch(
        `${GITHUB_API_URL_PREFIX}${owner}/${repo}${GITHUB_API_TREES_SUFFIX}/${treeSHA}${WITH_RECURSIVE_PARAMETER}`
      );
      const treeJSON = await treeRes.json();

      const numberOfItems = treeJSON[GithubData.TREE].length;
      // TODO: Revist when auth is complete

      // for (let index = 0; index < numberOfItems; index += 1) {
      //   const item = treeJSON[GithubData.TREE][index];
      //   if (item.type === IS_FILE) {
      //     const SHA = item.sha;
      //     const { path } = item;
      //     const blobs = await fetch(
      //       `${GITHUB_API_URL_PREFIX}${owner}/${repo}${GITHUB_API_BLOBS_SUFFIX}/${SHA}`
      //     )
      //       .then((blobs) => blobs.json())
      //       .then((data) =>
      //         builtInComments.push({
      //           path,
      //           comment: atob(data[GithubData.CONTENT]),
      //         })
      //       )
      //       .catch((error) => alert(`Error${error}`));
      //   }
      // }

      setTreeCore(
        ripOutPaths(
          treeJSON as GithubAPIResponseBody,
          oldTree,
          builtInComments,
          config.RegexKeyword
        )
      );
    } catch (error) {
      alert(`Error${error}`);
    }

    // Languages
    try {
      const res = await fetch(
        `${GITHUB_API_URL_PREFIX}${owner}/${repo}${GITHUB_API_TREES_LANGUAGES}`
      );
      const resJSON = await res.json();
      setRepoLanguages(formatLanguages(resJSON));
    } catch (error) {
      alert(`Error${error}`);
    }

    // License
    try {
      if (config.License) {
        const res = await fetch(
          `${GITHUB_API_URL_PREFIX}${owner}/${repo}/${GITHUB_API_LICENSES_PREFIX}`
        );
        const resJSON = await res.json();
        setLicense(resJSON[GITHUB_API_LICENSES_PREFIX].name);
        // TODO: Revist when auth is complete

        // if (resJSON) {
        //   const LicenseExist = resJSON[GITHUB_API_LICENSES_PREFIX].key;
        // }
        // if (config.License === LicenseExist) {
        //   setLicense(atob(resJSON[CONTENT_FIELD]));
        // } else {
        //   console.log(resJSON);
        // }

        // const res = await fetch(`${GITHUB_API_LICENSES}${config.License}`);

        // setLicense(resJSON);
        // setLicense({
        //   name: resJSON[LICENSE_FIELD].name,
        //   url: resJSON[LICENSE_FIELD].html_url,
        // });
      }
    } catch (error) {
      // let res = await fetch(`${GITHUB_API_LICENSES}${config.License}`);
      // let resJSON = await res.json();
      // let content = resJSON[BODY_FIELD];
      // content = content.replace("[fullname]", ownerName);
      // const date = new Date();
      // content = content.replace("[year]", date.getFullYear().toString());
      // const data = {
      //   message: "my commit message",
      //   content: "bXkgbmV3IGZpbGUgY29udGVudHM=",
      //   path: "LICENSE.txt",
      //   committer: {
      //     name: "",
      //     email: "",
      //   },
      // };
      // res = await fetch(
      //   `${GITHUB_API_URL_PREFIX}${owner}/${repo}${GITHUB_API_CONTENTS_SUFFIX}/LICENSE.txt`,
      //   { method: "POST", body: JSON.stringify(data) }
      // );
      // console.log(res);
    }

    // Contributors
    try {
      const res = await fetch(
        `${GITHUB_API_URL_PREFIX}${owner}/${repo}${GITHUB_API_TREES_CONTRIBUTORS}`
      );
      let userDetails: object[] = [];
      const needsDetails =
        config.AuthorConfigs.AuthorInfo.WithEmail ||
        config.AuthorConfigs.AuthorInfo.WithLocation ||
        config.AuthorConfigs.AuthorInfo.WithNumberOfRepos ||
        config.AuthorConfigs.AuthorInfo.WithTwitterUsername;
      const resJSON = await res.json();
      if (needsDetails) {
        for (let user in resJSON) {
          const resp = await fetch(`${resJSON[user][URL_FIELD]}`);
          const respJSON = await resp.json();
          userDetails.push(respJSON);
        }
      }

      const allAuthorinfos = resJSON.map((item, i) =>
        Object.assign({}, item, userDetails[i])
      );

      setContributors(allAuthorinfos);
    } catch (error) {
      alert(`Error${error}`);
    }
  };

  return (
    <div className="container container-small">
      <URLBox
        value={url}
        onChange={handleURLChange}
        onClick={handleGoButtonPress}
        onDefaultClick={handleExampleGoButtonPress}
      />
      {configState.APPLICATION_NAME.length !== 0 && (
        <Card>
          <div className="row">
            <div className="col">
              <h2>{configState.APPLICATION_NAME}</h2>
            </div>
          </div>
          {config.AppDescription && (
            <div className="row">
              <div className="col">
                <p>{configState.AppDescription}</p>
              </div>
            </div>
          )}
          {config.GooglePlayLink && (
            <div>
              <div className="row">
                <ContentSection>
                  <a href={config.GooglePlayLink}>
                    <img src={GOOGLEPLAY_BADGE} alt="GooglePlay" height="50" />
                  </a>
                </ContentSection>
              </div>
              <br />
            </div>
          )}

          {config.IOSStoreLink && (
            <div>
              <div className="row">
                <ContentSection>
                  <a href={config.IOSStoreLink}>
                    <img src={IOSSTORE_BADGE} alt="IOSStore" height="50" />
                  </a>
                </ContentSection>
              </div>
              <br />
            </div>
          )}

          {config.RepoLogo && (
            <div>
              <div className="row">
                <ContentSection>
                  <img src={config.RepoLogo} alt="RepoLogo" height="50" />
                </ContentSection>
              </div>
              <br />
            </div>
          )}
        </Card>
      )}
      {repoName !== "" && isNpmBadgeVisible && <BadgesSection url={repoName} />}
      {contributors.length > 0 && (
        <AuthorsSection
          config={config}
          contributors={contributors}
          ownersName={ownerName}
        />
      )}
      {repoLanguages.length !== 0 && (
        <Card>
          <div className="row">
            <div className="col">
              <h2>Languages</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <GetAlternateColorRow content={repoLanguages} />
            </div>
          </div>
          <div className="row">
            <CenteredCol className="col">
              <CopyToClipboard
                text={tagWrap(
                  tagWrap(`\n${repoLanguages.join("\n")}\n`, PRE_TAG),
                  BIG_TAG
                )}
              >
                <CustomSecondaryButton
                  type="submit"
                  value="Copy to Clipboard"
                />
              </CopyToClipboard>
            </CenteredCol>
          </div>
        </Card>
      )}
      {config.WithTableOfContent && tableOfContent.length > 0 && (
        <TOCSection content={tableOfContent} />
      )}
      {config.License && license && <LicenseSection content={license} />}
      {config.Backers && backers.length > 0 && (
        <LinkedImageSection content={backers} header={BACKERS_HEADER} />
      )}
      {config.Sponsors && sponsors.length > 0 && (
        <LinkedImageSection content={sponsors} header={SPONSORS_HEADER} />
      )}

      {config.IncludePackageCommands && tableOfCommands && (
        <Card>
          <div className="row">
            <div className="col">
              <h2>Table of Commands</h2>
            </div>
          </div>
          <div className="row">
            <div className="col">{tableOfCommands}</div>
          </div>
          <div className="row">
            <CenteredCol className="col">
              <CopyToClipboard text={`\n${tableOfCommands}\n`}>
                <CustomSecondaryButton
                  type="submit"
                  value="Copy to Clipboard"
                />
              </CopyToClipboard>
            </CenteredCol>
          </div>
        </Card>
      )}
      {treeCore.length !== 0 && <MarkdownDisplay treeCore={treeCore} />}
    </div>
  );
};

export default App;

const ContentSection = styled.div``;
