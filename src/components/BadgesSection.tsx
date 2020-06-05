import React from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Card from './reusable/Card';
import CenteredCol from './reusable/CenteredCol';
import CustomSecondaryButton from './reusable/CustomSecondaryButton';
import { repoToMarkDownBadge } from '../utils/repoToBadge';

// Styles

const BadgeDisplay = styled.div`
  width: 100%;
`;

// Components

interface Props {
  repoName: string;
}

const BadgesSection: React.FC<Props> = ({ repoName }: Props) => (
  <Card>
    <div className="row">
      <div className="col">
        <h2>Badges</h2>
      </div>
    </div>
    <div className="row">
      <div className="col">
        <BadgeDisplay>
          <a href={`https://badge.fury.io/js/${repoName}`}>
            <img src={`https://badge.fury.io/js/${repoName}.svg`} alt="npm version" height="18" />
          </a>
        </BadgeDisplay>
      </div>
    </div>
    <div className="row">
      <CenteredCol className="col">
        <CopyToClipboard text={repoToMarkDownBadge(repoName)}>
          <CustomSecondaryButton type="submit" value="Copy to Clipboard" />
        </CopyToClipboard>
      </CenteredCol>
    </div>
  </Card>
);

export default BadgesSection;
