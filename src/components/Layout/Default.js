import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import HeaderContainer from '../Header/Header';

export const Default = ({ children }) => {
  const { Row, Column } = Grid;

  return (
    <>
      <HeaderContainer />
      <Grid centered>
        <Row>
          <Column width={4}>
            <div>{children}</div>
          </Column>
        </Row>
      </Grid>
    </>
  );
};
Default.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Default;
