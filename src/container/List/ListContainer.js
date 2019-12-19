import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Button } from 'semantic-ui-react';

export const ListContainer = () => {
  const voteList = () => JSON.parse(window.localStorage.getItem('voteList'));
  // const [voteList, setVoteList] = useState([localeVoteList]);

  // const getLocalStorage = () => {
  //   setVoteList(localStorageVoteList);
  // };

  // useEffect(() => {
  //   getLocalStorage();
  // });

  const handleUpVote = () => {
    // console.log('handleupvote');
  };

  const handleDownVote = () => {
    // console.log('handleDownvote');
  };

  const { Content, Header, Meta } = Card;
  return (
    <section className="cardContainer">
      <div className="cardAddContent">
        <Link to="/add">
          <Icon name="plus" className="backgroundCover" />
          SUBMIT A LINK
        </Link>
      </div>
      <Card>
        {voteList &&
          voteList.map(cardItem => (
            <Content key={cardItem.id}>
              <div className="cardListContent">
                <div className="cardListContent_viotPoint backgroundCover">
                  <span>{cardItem.point}</span>
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
