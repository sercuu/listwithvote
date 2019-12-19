import React, { createContext, useReducer, useContext } from 'react';
// https://itnext.io/react-global-state-management-with-hooks-74785024d24

const SET_DOGGIE = 'SET_DOGGIE';

const GlobalStateContext = createContext();

const initialState = {
  doggie: {
    name: null,
    breed: null,
    isGoodBoy: true,
  },
};

const globalStateReducer = (state, action) => {
  switch (action.type) {
    case SET_DOGGIE:
      return {
        ...state,
        doggie: { ...action.payload },
      };

    default:
      return state;
  }
};

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  return (
    <GlobalStateContext.Provider value={[state, dispatch]}>{children}</GlobalStateContext.Provider>
  );
};

const useGlobalState = () => {
  const [state, dispatch] = useContext(GlobalStateContext);

  const setDoggie = ({ name, breed, isGoodBoy }) => {
    dispatch({
      type: SET_DOGGIE,
      payload: {
        name,
        breed,
        isGoodBoy,
      },
    });
  };

  return {
    setDoggie,
    doggie: { ...state.doggie },
  };
};

export default useGlobalState;
