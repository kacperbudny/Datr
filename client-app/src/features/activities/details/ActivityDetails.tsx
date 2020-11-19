import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
import { RootStoreContext } from "../../../app/stores/rootStore";

interface DetailParams {
  id: string;
}

const ActivityDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const rootStore = useContext(RootStoreContext);
  const { activity, loadActivity, loadingInitial } = rootStore.activityStore;
  const attendees = activity?.attendees;
  const { user } = rootStore.userStore;
  useEffect(() => {
    loadActivity(match.params.id);
  }, [loadActivity, match.params.id, history]);

  if (loadingInitial)
    return <LoadingComponent content="Wczytywanie randki..." />;

  if (!activity) return <h2>Randki nie znaleziono</h2>;

  if (attendees?.filter((x) => x.username === user?.username).length == 1) {
    return (
      <Grid>
        <Grid.Column width={10}>
          <ActivityDetailedHeader activity={activity} />
          <ActivityDetailedInfo activity={activity} />
          <ActivityDetailedChat />
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailedSidebar attendees={activity.attendees} />
        </Grid.Column>
      </Grid>
    );
  } else {
    return (
      <Grid>
        <Grid.Column width={10}>
          <ActivityDetailedHeader activity={activity} />
          <ActivityDetailedInfo activity={activity} />
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityDetailedSidebar attendees={activity.attendees} />
        </Grid.Column>
      </Grid>
    );
  }
};

export default observer(ActivityDetails);
