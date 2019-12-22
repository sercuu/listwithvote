/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import uuid from 'uuid';
import { Icon, Button, Form, Input, Message } from 'semantic-ui-react';
import * as ValidationController from '../../helpers/validation';

export const AddVoteCardContainer = () => {
  const [name, setName] = useState('');
  const [path, setPath] = useState('');
  const [messageIsHidden, setMessageIsHidden] = useState(true);
  const [addButtonIsDisalbe, setAddButtonIsDisalbe] = useState(true);
  const [formIsValid, setFormIsValid] = useState(false);

  useEffect(() => {
    setAddButtonIsDisalbe(false);
  }, [name, path]);
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
    setFormIsValid(false);
    const localStorageVoteList = JSON.parse(localStorage.getItem('voteList'));
    const validationRules = ValidationController.schema({
      name: [ValidationController.string(), ValidationController.minLength(1)],
      path: [ValidationController.string(), ValidationController.minLength(1)],
    });
    const isValid = ValidationController.validate({ name, path }, validationRules);
    if (isValid) {
      const voteList = [
        {
          name,
          path,
          id: uuid(),
          point: 0,
        },
        ...(localStorageVoteList !== null ? localStorageVoteList : []),
      ];
      asyncLocalStorage.setItem('voteList', JSON.stringify(voteList)).then(() => {
        setMessageIsHidden(false);
        // close message & reset state with setTimeout
        setTimeout(() => {
          setMessageIsHidden(true);
          setName('');
          setPath('');
        }, 1000);
      });
    } else {
      setFormIsValid(true);
    }
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
          {formIsValid ? <p className="error">Lütfen boş alanları doldurunuz.</p> : ''}

          <Button disabled={addButtonIsDisalbe} type="submit">
            ADD
          </Button>
        </Form>
      </div>
      <Message success hidden={messageIsHidden} content={`${name.toUpperCase()} ADDED`} />
    </section>
  );
};

export default AddVoteCardContainer;
