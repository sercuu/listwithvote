import React from 'react';
import { Grid } from 'semantic-ui-react';

export const Header = () => {
  const { Row, Column } = Grid;
  return (
    <Grid columns={16}>
      <Row>
        <Column width={8}>Logo</Column>
        <Column width={8} className="text-align-right">
          LinkVOTE Challenge
        </Column>
      </Row>
    </Grid>
  );
};
export default Header;
