import React from "react";
import { Grid, Button } from "semantic-ui-react";
import AvatarButtons from "./AvatarButtons";
import { AvatarCanvas } from "./AvatarCanvas";

export const AvatarForm: React.FC = () => {
  return (
    <div>
      <Grid>
        <Grid.Column width={8}>
          <AvatarCanvas/>
          <div id="avatar-buttons">
          <Button positive type="submit" content="Zatwierdź" />
          <Button type="button" content="Anuluj" />
          </div>
        </Grid.Column>
        <Grid.Column width={8}>
          <AvatarButtons />
        </Grid.Column>
      </Grid>
    </div>
  );
};
