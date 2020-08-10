import React, { useState } from "react";
import Card from "./reusable/Card";
import Input from "./reusable/Input";
import CustomButton from "./reusable/CustomButton";
import { OauthSender } from "react-oauth-flow";

interface Props {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: MouseEvent) => void;
  onDefaultClick: () => void;
}

const SAHAND_CLIENT_ID = "https://project-structure-readme.netlify.app/";
const REDIRECT_URL = "https://project-structure-readme.netlify.app/";
const AUTHORIZE_URL = "https://github.com/login/oauth/authorize?";

export const SendToGithub: React.FC<Props> = () => {
  return (
    <OauthSender
      authorizeUrl={AUTHORIZE_URL}
      clientId={SAHAND_CLIENT_ID}
      redirectUri={REDIRECT_URL}
      render={({ url }) => <a href={url}>Connect to Github</a>}
    />
  );
};

const URLBox: React.FC<Props> = (props: Props) => {
  return (
    <Card>
      <SendToGithub {...props}></SendToGithub>
      <div className="row">
        <div className="col">
          <h1>Tree-o-Tron™</h1>
        </div>
      </div>
      <div className="row">
        <div
          className="col"
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "row",
            paddingLeft: "4rem",
            paddingRight: "4rem",
          }}
        >
          <Input
            placeholder="Enter a public GitHub URL"
            value={props.value}
            onChange={props.onChange}
          />
          <CustomButton value="Go" onClick={props.onClick} />
        </div>
      </div>
      <div className="row">
        <div
          className="col"
          style={{
            justifyContent: "center",
            display: "flex",
            flexDirection: "row",
            marginTop: "2rem",
          }}
        >
          <CustomButton
            value="Visualize an Example"
            onClick={props.onDefaultClick}
          />
        </div>
      </div>
    </Card>
  );
};
export default URLBox;
