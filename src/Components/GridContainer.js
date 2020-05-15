import React from "react";
import { Grid } from "semantic-ui-react";

export default function GridContainer({ children }) {
  return (
    <Grid padded="vertically" columns={1} centered>
      <Grid.Row>
        <Grid.Column style={{ maxWidth: 550 }}>{children}</Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
