import React from 'react';
import { Card, Icon, Button } from 'semantic-ui-react';

const model = [
  {
    path: 'https://news.ycombinator.com/',
    name: 'Hacker News',
    point: 2,
    id: 1,
  },
  {
    path: 'https://stackoverflow.com/',
    name: 'Stackoverflow',
    point: 3,
    id: 2,
  },
  {
    path: 'https://react.semantic-ui.com/',
    name: 'Semantic UI',
    point: 6,
    id: 3,
  },
];

const handleUpVote = () => {
  console.log('handleupvote');
};

const handleDownVote = () => {
  console.log('handleDownvote');
};

export const ListContainer = () => {
  const { Content, Header, Meta } = Card;
  return (
    <section className="cardContainer">
      <div className="cardSubmitContent">
        <Button size="big" basic>
          <Icon name="plus" className="backgroundCover" />
          SUBMIT A LINK
        </Button>
      </div>
      <hr />
      <Card>
        {model.map(cardItem => (
          <Content key={cardItem.id}>
            <div className="cardListContent">
              <div className="cardListContent_viotPoint backgroundCover">
                <strong>{cardItem.point}</strong>
                <p>POINT</p>
              </div>
              <div>
                <Header>{cardItem.name}</Header>
                <Meta>{`(${cardItem.path})`}</Meta>
                <div className="cardListContent_action">
                  <Button
                    basic
                    onClick={() => {
                      handleUpVote();
                    }}
                  >
                    <Icon name="arrow up" />
                    Up Vote
                  </Button>
                  <Button
                    basic
                    onClick={() => {
                      handleDownVote();
                    }}
                  >
                    <Icon name="arrow down" />
                    Down Vote
                  </Button>
                </div>
              </div>
            </div>
          </Content>
        ))}
      </Card>
    </section>
  );
};

export default ListContainer;
