import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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

class ListContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // handleUpVote() {
  //   // console.log('handleupvote');
  // }

  // handleDownVote() {
  //   // console.log('handleDownvote');
  // }

  render() {
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
          {model.map(cardItem => (
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
                        this.handleUpVote();
                      }}
                    >
                      <Icon name="arrow up" />
                      Up Vote
                    </Button>
                    <Button
                      basic
                      onClick={() => {
                        this.handleDownVote();
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
  }
}
// const mapStateToProps = state => {
//   // const { list } = state.todolist;
//   return {
//     // list,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     // delete: id => dispatch(todolistDelete(id)),
//     // get: () => dispatch(todolistGet),
//     // post: item => dispatch(todolistPost(item)),
//     // edit : item => dispatch(todolistEdit(item))
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ListContainer);
export default connect()(ListContainer);
