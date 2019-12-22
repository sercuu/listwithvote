/* eslint-disable no-param-reassign */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Icon, Button, Pagination, Modal, Message, Select } from 'semantic-ui-react';
import pagination from '../../helpers/pagination';

const options = [
  { key: 'mostVote', value: 'mostVote', text: 'Most Vote (Z>A)' },
  { key: 'lessVote', value: 'lessVote', text: 'Less Vote (A>Z)' },
];
const PAGE_SIZE = 5;

export const ListContainer = () => {
  const localStorageVoteList = JSON.parse(window.localStorage.getItem('voteList'));
  const [stateVoteList, setStateVoteList] = useState(localStorageVoteList);
  const [voteList, setVoteList] = useState([]);
  const [totalCount, setPageSize] = useState('');
  const [paginationActivePage, setActivePage] = useState(1);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [cardName, setCardName] = useState('');
  const [cardToBeDeleted, setCardToBeDeleted] = useState({});
  const [messageIsHidden, setMessageIsHidden] = useState(true);

  useEffect(() => {
    if (localStorageVoteList) {
      const calcTotalCount = Math.ceil(stateVoteList.length / PAGE_SIZE);
      setPageSize(calcTotalCount);
      const pageableVoteList = pagination(stateVoteList, PAGE_SIZE, 1);
      setVoteList(pageableVoteList);
    }
  }, []);

  useEffect(() => {
    const recalcTotalCount = stateVoteList && Math.ceil(stateVoteList.length / PAGE_SIZE);
    const calcPageableVoteList = pagination(stateVoteList, PAGE_SIZE, paginationActivePage);
    if (recalcTotalCount < totalCount && calcPageableVoteList.length === 0) {
      const pageableVoteList = pagination(stateVoteList, PAGE_SIZE, recalcTotalCount);
      setActivePage(recalcTotalCount);
      setVoteList(pageableVoteList);
    }
    setPageSize(recalcTotalCount);
  }, [stateVoteList]);

  const handleUpVote = cardItem => {
    const updatedVoteList = localStorageVoteList.map(item => {
      if (item.id === cardItem.id) {
        item.point += 1;
      }
      return item;
    });
    localStorage.setItem('voteList', JSON.stringify(updatedVoteList));
    const updatedPageableVoteList = pagination(updatedVoteList, PAGE_SIZE, paginationActivePage);
    setVoteList(updatedPageableVoteList);
    setStateVoteList(updatedVoteList);
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
      const updatedPageableVoteList = pagination(updatedVoteList, PAGE_SIZE, paginationActivePage);
      setVoteList(updatedPageableVoteList);
      setStateVoteList(updatedVoteList);
    }
  };

  const handlePaginationChange = (e, { activePage }) => {
    const pageableVoteList = pagination(stateVoteList, PAGE_SIZE, activePage);
    setVoteList(pageableVoteList);
    setActivePage(activePage);
  };

  const handleOpenModal = cardItem => {
    setModalIsOpen(true);
    setCardToBeDeleted(cardItem);
    setCardName(cardItem.name);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleDeleteCard = () => {
    const cleanVoteList = stateVoteList.filter(item => item.id !== cardToBeDeleted.id);
    const pagealbeCleanVoteList = pagination(cleanVoteList, PAGE_SIZE, paginationActivePage);
    localStorage.setItem('voteList', JSON.stringify(cleanVoteList));
    setVoteList(pagealbeCleanVoteList);
    setStateVoteList(cleanVoteList);
    handleCloseModal();
    setMessageIsHidden(false);
    setTimeout(() => {
      setMessageIsHidden(true);
    }, 1000);
  };

  const handleResortByVotePoint = (e, { value }) => {
    if (value === 'mostVote') {
      const mostVoteList = stateVoteList.sort((a, b) => {
        return b.point - a.point;
      });
      const sortedByMostVoteList = pagination(mostVoteList, PAGE_SIZE, paginationActivePage);
      setVoteList(sortedByMostVoteList);
    } else if (value === 'lessVote') {
      const lessVoteList = stateVoteList.sort((a, b) => {
        return a.point - b.point;
      });
      const sortedByLessVoteList = pagination(lessVoteList, PAGE_SIZE, paginationActivePage);
      setVoteList(sortedByLessVoteList);
    }
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
      <div className="cardContainer_select">
        <Select placeholder="Order by" options={options} onChange={handleResortByVotePoint} />
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
      <Modal open={modalIsOpen} onClose={handleCloseModal} size="tiny" closeIcon>
        <Modal.Header>REMOVE LINK</Modal.Header>
        <Modal.Content>
          <Modal.Description className="text-align-center deleteModal">
            <p>Do you want to remove</p>
            <span>{cardName.toUpperCase()}</span>
          </Modal.Description>
          <div className="text-align-center deleteModal_actions">
            <Button size="large" secondary onClick={handleCloseModal}>
              CLOSE
            </Button>
            <Button size="large" secondary onClick={handleDeleteCard}>
              OK
            </Button>
          </div>
        </Modal.Content>
      </Modal>
      <Message success hidden={messageIsHidden} content={`${cardName.toUpperCase()} REMOVED.`} />
    </section>
  );
};

export default ListContainer;
