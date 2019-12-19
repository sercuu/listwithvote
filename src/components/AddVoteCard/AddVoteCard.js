/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Button, Form, Input } from 'semantic-ui-react';

export const AddVoteCardContainer = () => {
  const [name, setName] = useState('');
  const [path, setPath] = useState('');

  const handleNameChange = e => {
    setName(e.target.value);
  };

  const handlePathChange = e => {
    setPath(e.target.value);
  };

  const handleSubmit = () => {
    const localStorageVoteList = JSON.parse(localStorage.getItem('voteList'));
    const newVoteList = [
      {
        name,
        path,
        id: name,
        point: 0,
      },
      ...(localStorageVoteList !== null ? localStorageVoteList : []),
    ];
    localStorage.setItem('voteList', JSON.stringify(newVoteList));
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
    </section>
  );
};

export default AddVoteCardContainer;
