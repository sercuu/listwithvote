import React from 'react';
import { Card } from 'semantic-ui-react';

export const ListContainer = () => {
  const { Content, Header, Meta } = Card;
  return (
    <Card>
      <Content>
        <div>
          <div>6 POINT</div>
          <div>
            <Header>Hacker News</Header>
            <Meta>(https://news.ycombinator.com/)</Meta>
          </div>
        </div>
      </Content>
    </Card>
  );
};

export default ListContainer;
