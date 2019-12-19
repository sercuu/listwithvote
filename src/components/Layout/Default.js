import React from 'react';
import PropTypes from 'prop-types';
import HeaderContainer from '../Header/Header';

export const Default = ({ children }) => {
  return (
    <>
      <HeaderContainer />
      <div className="defaultLayout">{children}</div>
    </>
  );
};
Default.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Default;
