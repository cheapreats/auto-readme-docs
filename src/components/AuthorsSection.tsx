import React from "react";
import Card from "./reusable/Card";
import { IConfigurationState } from "../contexts/configuration/ConfigurationContext";
import CustomSecondaryButton from "../components/reusable/CustomSecondaryButton";
import CenteredCol from "../components/reusable/CenteredCol";
import { CopyToClipboard } from "react-copy-to-clipboard";
import generateAuthorsTable from "../utils/generateAuthorsTable";

const USER_LINK_FIELD = "html_url";
const WITH_LOGIN_FIELD = "login";
const WITH_PICTURE_FIELD = "avatar_url";
const WITH_CONTRIBUTIONS_FIELD = "contributions";
const WITH_EMAIL_FIELD = "email";
const WITH_LOCATION_FIELD = "location";
const WITH_TWITTER_USERNAME_FIELD = "twitter_userName";
const WITH_NUMBER_OF_REPOS_FIELD = "public_repos";
const ALIGN_TD = "center";
const IMAGE_SIZE = "100px;";
const TWITTER_SIZE = "70px;";
const TWITTER_PICTURE =
  "https://cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-512.png";

interface Props {
  config: IConfigurationState;
  contributors: object[];
  ownersName: string;
}

const AuthorsSection: React.FC<Props> = ({
  config,
  contributors,
  ownersName,
}): React.ReactElement => {
  return (
    <Card>
      <div className="row">
        <div className="col">
          <h2>Contributors</h2>
        </div>
      </div>

      <div>
        <table>
          <tr>
            {config.AuthorConfigs.AuthorInfo.WithName && <th>Name</th>}
            {config.AuthorConfigs.AuthorInfo.WithPicture && <th> Picture </th>}
            {config.AuthorConfigs.AuthorInfo.WithEmail && <th>Email</th>}
            {config.AuthorConfigs.AuthorInfo.WithLocation && (
              <th> Location </th>
            )}

            {config.AuthorConfigs.AuthorInfo.WithContributions && (
              <th> Contributions </th>
            )}
            {config.AuthorConfigs.AuthorInfo.WithNumberOfRepos && (
              <th> Repos </th>
            )}
            {config.AuthorConfigs.AuthorInfo.WithTwitterUsername && (
              <th> Twitter </th>
            )}
          </tr>
          {config.AuthorConfigs.onlyOwner &&
            contributors
              .filter(
                (contributors) => contributors[WITH_LOGIN_FIELD] === ownersName
              )
              .map((contributer, key) => (
                <tr>
                  {config.AuthorConfigs.AuthorInfo.WithName && (
                    <td align={ALIGN_TD}>
                      <a href={contributer[USER_LINK_FIELD]}>
                        {contributer[WITH_LOGIN_FIELD]}
                      </a>
                    </td>
                  )}
                  {config.AuthorConfigs.AuthorInfo.WithPicture && (
                    <td align={ALIGN_TD}>
                      <a href={contributer[USER_LINK_FIELD]}>
                        <img
                          src={contributer[WITH_PICTURE_FIELD]}
                          width={IMAGE_SIZE}
                        />
                      </a>
                    </td>
                  )}
                  {config.AuthorConfigs.AuthorInfo.WithEmail && (
                    <td align={ALIGN_TD}>{contributer[WITH_EMAIL_FIELD]}</td>
                  )}
                  {config.AuthorConfigs.AuthorInfo.WithLocation && (
                    <td align={ALIGN_TD}>{contributer[WITH_LOCATION_FIELD]}</td>
                  )}
                  {config.AuthorConfigs.AuthorInfo.WithContributions && (
                    <td align={ALIGN_TD}>
                      {contributer[WITH_CONTRIBUTIONS_FIELD]}
                    </td>
                  )}
                  {config.AuthorConfigs.AuthorInfo.WithNumberOfRepos && (
                    <td align={ALIGN_TD}>
                      {contributer[WITH_NUMBER_OF_REPOS_FIELD]}
                    </td>
                  )}
                  {config.AuthorConfigs.AuthorInfo.WithTwitterUsername && (
                    <td>
                      <a href={contributer[WITH_TWITTER_USERNAME_FIELD]}>
                        <img src={TWITTER_PICTURE} width={TWITTER_SIZE} />
                      </a>
                    </td>
                  )}
                </tr>
              ))}
          {!config.AuthorConfigs.onlyOwner &&
            contributors.map((contributer, key) => (
              <tr>
                {config.AuthorConfigs.AuthorInfo.WithName && (
                  <td align={ALIGN_TD}>
                    <a href={contributer[USER_LINK_FIELD]}>
                      {contributer[WITH_LOGIN_FIELD]}
                    </a>
                  </td>
                )}
                {config.AuthorConfigs.AuthorInfo.WithPicture && (
                  <td align={ALIGN_TD}>
                    <a href={contributer[USER_LINK_FIELD]}>
                      <img
                        src={contributer[WITH_PICTURE_FIELD]}
                        width={IMAGE_SIZE}
                      />
                    </a>
                  </td>
                )}
                {config.AuthorConfigs.AuthorInfo.WithEmail && (
                  <td align={ALIGN_TD}>{contributer[WITH_EMAIL_FIELD]}</td>
                )}
                {config.AuthorConfigs.AuthorInfo.WithLocation && (
                  <td align={ALIGN_TD}>{contributer[WITH_LOCATION_FIELD]}</td>
                )}
                {config.AuthorConfigs.AuthorInfo.WithContributions && (
                  <td align={ALIGN_TD}>
                    {contributer[WITH_CONTRIBUTIONS_FIELD]}
                  </td>
                )}
                {config.AuthorConfigs.AuthorInfo.WithNumberOfRepos && (
                  <td align={ALIGN_TD}>
                    {contributer[WITH_NUMBER_OF_REPOS_FIELD]}
                  </td>
                )}
                {config.AuthorConfigs.AuthorInfo.WithTwitterUsername && (
                  <td>
                    <a href={contributer[WITH_TWITTER_USERNAME_FIELD]}>
                      <img src={TWITTER_PICTURE} width={TWITTER_SIZE} />
                    </a>
                  </td>
                )}
              </tr>
            ))}
        </table>
      </div>
      <div className="row">
        <CenteredCol className="col">
          <CopyToClipboard
            text={`\n${generateAuthorsTable(
              config,
              contributors,
              ownersName
            )}\n`}
          >
            <CustomSecondaryButton type="submit" value="Copy to Clipboard" />
          </CopyToClipboard>
        </CenteredCol>
      </div>
    </Card>
  );
};

export default AuthorsSection;
