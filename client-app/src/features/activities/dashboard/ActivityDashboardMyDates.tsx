import React, { useContext, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import { observer } from "mobx-react-lite";
import { LoadingComponent } from "../../../app/layout/LoadingComponent";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ActivityMyDatesList from "./ActivityMyDatesList";

const ActivityDashboardMyDates: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { loadActivities, loadingInitial } = rootStore.activityStore;
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loadingInitial)
    return <LoadingComponent content="Wczytywanie randek..." />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityMyDatesList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Filtry randek</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboardMyDates);
