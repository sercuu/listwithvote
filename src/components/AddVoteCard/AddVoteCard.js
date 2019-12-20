/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid';
import { Icon, Button, Form, Input, Message } from 'semantic-ui-react';

export const AddVoteCardContainer = () => {
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [messageIsHidden, setmessageIsHidden] = useState(true);

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handlePathChange = e => {
    setPath(e.target.value);
  };

  const asyncLocalStorage = {
    setItem(key, value) {
      return Promise.resolve().then(() => {
        localStorage.setItem(key, value);
      });
    },
  };

  const handleSubmit = () => {
    const localStorageVoteList = JSON.parse(localStorage.getItem('voteList'));
    const voteList = [
      {
        name,
        path,
        id: uuid(),
        point: 0,
      },
      ...(localStorageVoteList !== null ? localStorageVoteList : []),
    ];
    localStorage.setItem('voteList', JSON.stringify(voteList));

    let i;
    let j;
    let temparray;
    const chunk = 5;
    const pageableVoteList = [];
    for (i = 0, j = voteList.length; i < j; i += chunk) {
      temparray = voteList.slice(i, i + chunk);
      pageableVoteList.push(temparray);
    }
    asyncLocalStorage.setItem('pageableVoteList', JSON.stringify(pageableVoteList)).then(() => {
      setmessageIsHidden(false);
      // close message & reset state with setTimeout
      setTimeout(() => {
        setmessageIsHidden(true);
        setName('');
        setPath('');
      }, 1000);
    });
  };

  return (
    <section className="addVoteCard">
      <div className="addVoteCard_returnButton">
        <Link to="/list">
          <Icon name="arrow left" />
          Return to list
        </Link>
      </div>
      <div className="addVoteCard_title">
        <h1>Add New Link</h1>
      </div>
      <div className="addVoteCard_form">
        <Form onSubmit={handleSubmit}>
          <label htmlFor="name">
            Link Name:
            <Input
              id="name"
              type="text"
              value={name}
              placeholder="e.g. Alphabet"
              onChange={handleNameChange}
            />
          </label>
          <label htmlFor="path">
            Link URL:
            <Input
              id="path"
              value={path}
              type="text"
              placeholder="e.g. http://abc.xyz"
              onChange={handlePathChange}
            />
          </label>
          <Button type="submit">ADD</Button>
        </Form>
      </div>
      <Message success hidden={messageIsHidden} content={`${name} ADDED`} />
    </section>
  );
};

export default AddVoteCardContainer;
