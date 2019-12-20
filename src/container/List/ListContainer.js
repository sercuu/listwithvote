/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Button, Pagination, Modal } from 'semantic-ui-react';

export const ListContainer = () => {
  const localStoragePageableVoteList = JSON.parse(window.localStorage.getItem('pageableVoteList'));
  const localStorageVoteList = JSON.parse(window.localStorage.getItem('voteList'));

  const [voteList, setVoteList] = useState([]);
  const [totalCount, setPageSize] = useState('');
  const [paginationActivePage, setActivePage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardtobeDeleted, setCardtobeDeleted] = useState({});

  useEffect(() => {
    if (localStoragePageableVoteList) {
      const totalPageCount = localStoragePageableVoteList.length;
      setPageSize(totalPageCount);
      setVoteList(localStoragePageableVoteList[0]);
    }
  }, []);

  const handleUpVote = cardItem => {
    const updatedVoteList = localStorageVoteList.map(item => {
      if (item.id === cardItem.id) {
        item.point += 1;
      }
      return item;
    });
    localStorage.setItem('voteList', JSON.stringify(updatedVoteList));
    const updatedPageableVoteList = localStoragePageableVoteList[paginationActivePage - 1].map(
      item => {
        if (item.id === cardItem.id) {
          item.point += 1;
        }
        return item;
      },
    );
    const settableUpdatedPageableVoteList = localStoragePageableVoteList;
    settableUpdatedPageableVoteList[paginationActivePage - 1] = updatedPageableVoteList;

    localStorage.setItem('pageableVoteList', JSON.stringify(settableUpdatedPageableVoteList));
    setVoteList(localStoragePageableVoteList[paginationActivePage - 1]);
  };

  const handleDownVote = cardItem => {
    if (cardItem.point > 0) {
      const updatedVoteList = localStorageVoteList.map(item => {
        if (item.id === cardItem.id) {
          item.point -= 1;
        }
        return item;
      });
      localStorage.setItem('voteList', JSON.stringify(updatedVoteList));

      const updatedPageableVoteList = localStoragePageableVoteList[paginationActivePage - 1].map(
        item => {
          if (item.id === cardItem.id) {
            item.point -= 1;
          }
          return item;
        },
      );

      const settableUpdatedPageableVoteList = localStoragePageableVoteList;
      settableUpdatedPageableVoteList[paginationActivePage - 1] = updatedPageableVoteList;

      localStorage.setItem('pageableVoteList', JSON.stringify(settableUpdatedPageableVoteList));
      setVoteList(localStoragePageableVoteList[paginationActivePage - 1]);
    }
  };

  const handlePaginationChange = (e, { activePage }) => {
    setActivePage(activePage);
    setVoteList(localStoragePageableVoteList[activePage - 1]);
  };
  const handleDeleteCard = () => {
    console.log(cardtobeDeleted, 'cardtobeDeleted');
  };
  const handleOpenModal = cardItem => {
    setModalIsOpen(true);
    setCardtobeDeleted(cardItem);
    setCardName(cardItem.name);
  };
  const handleCloseModal = () => {
    setModalIsOpen(false);
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

      {voteList &&
        voteList.map(cardItem => (
          <Card key={cardItem.id}>
            <Content>
              <Button
                className="deleteButton"
                onClick={() => {
                  handleOpenModal(cardItem);
                }}
              >
                <Icon name="delete" />
              </Button>

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
                        handleUpVote(cardItem);
                      }}
                    >
                      <Icon name="arrow up" />
                      Up Vote
                    </Button>
                    <Button
                      basic
                      onClick={() => {
                        handleDownVote(cardItem);
                      }}
                    >
                      <Icon name="arrow down" />
                      Down Vote
                    </Button>
                  </div>
                </div>
              </div>
            </Content>
          </Card>
        ))}
      {totalCount > 1 ? (
        <div className="text-align-center">
          <Pagination
            activePage={paginationActivePage}
            // defaultActivePage={5}
            totalPages={totalCount}
            onPageChange={handlePaginationChange}
          />
        </div>
      ) : (
        ''
      )}
      <Modal open={modalIsOpen} onClose={handleCloseModal} size="tiny">
        <Modal.Header>REMOVE LINK</Modal.Header>
        <Modal.Content>
          <Modal.Description className="text-align-center deleteModal">
            <p>Do you want to remove</p>
            <span>{cardName.toUpperCase()}</span>
          </Modal.Description>
          <Button secondary onClick={handleCloseModal}>
            close
          </Button>
          <Button secondary onClick={handleDeleteCard}>
            Ok
          </Button>
        </Modal.Content>
      </Modal>
    </section>
  );
};

export default ListContainer;
