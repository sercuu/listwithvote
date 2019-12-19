import React from 'react';
import useGlobalState from '../../context/GlobalContext';

export const AddVoteCardContainer = () => {
  const globalState = useGlobalState();
  const curretDoggie = globalState.doggie;

  return <div>{curretDoggie.name}</div>;
};

export default AddVoteCardContainer;
