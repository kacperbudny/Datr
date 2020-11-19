import React, { useContext, Fragment } from "react";
import { Item } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
import { RootStoreContext } from "../../../app/stores/rootStore";
import ActivityMyDates from "./ActivityMyDates";

const ActivityMyDatesList: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { activitiesByDate, deleteActivity, target } = rootStore.activityStore;
  return (
    <Fragment>
      {activitiesByDate.map(([group, activities]) => (
        <Fragment key={group}>
          <Item.Group divided>
            {activities.map((activity) => (
              <ActivityMyDates key={activity.id} activity={activity} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </Fragment>
  );
};

export default observer(ActivityMyDatesList);
