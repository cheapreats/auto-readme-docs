import React from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { repoToMarkDownBadge } from '../utils/repoToBadge';
// Styles

const BadgeDisplay = styled.div`
  width: 100%;
`;

const Card = styled.div`
  width: 100%;
  padding: 2rem;
  background: #212428;
  color: white;
  margin: 25px 0;
`;

// Components

interface Props {
    repoName: string;
}

const BadgesSection: React.FC<Props> = ({ repoName }: Props) => (
  <Card>
    <BadgeDisplay>
      <a href={`https://badge.fury.io/js/${repoName}`}>
        <img src={`https://badge.fury.io/js/${repoName}.svg`} alt="npm version" height="18" />
      </a>
    </BadgeDisplay>
    <CopyToClipboard text={repoToMarkDownBadge(repoName)}>
      <button type="submit">Copy to Clipboard</button>
    </CopyToClipboard>
  </Card>
);

export default BadgesSection;
