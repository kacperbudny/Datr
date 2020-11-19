import React, { Fragment, useContext } from "react";
import { Item, Button, Segment, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IActivity } from "../../../app/models/activity";
import { format } from "date-fns";
import ActivityListItemAttendees from "./ActivityListItemAttendees";
import UserStore from "../../../app/stores/userStore";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { trace } from "mobx";

const ActivityMyDates: React.FC<{ activity: IActivity }> = ({ activity }) => {
  const host = activity.attendees.filter((x) => x.isHost)[0];
  const rootStore = useContext(RootStoreContext);
  const attendees = activity.attendees;
  const { user } = rootStore.userStore;
  const { deleteActivity, target, submitting } = rootStore.activityStore;
  if (
    attendees.find((x) => x.username === user?.username && x.isHost === true)
  ) {
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image
                size="tiny"
                circular
                src={host.image || "/assets/user.png"}
              />
              <Item.Content>
                <Item.Header as={Link} to={`/activities/${activity.id}`}>
                  {activity.title}
                </Item.Header>
                <Item.Description>
                  Stworzone przez: {host.displayName}
                </Item.Description>
                {activity.isHost && (
                  <Item.Description>
                    <Label
                      basic
                      color="orange"
                      content="To ty utworzyłeś tę randkę"
                    />
                  </Item.Description>
                )}
                {activity.isGoing && !activity.isHost && (
                  <Item.Description>
                    <Label
                      basic
                      color="green"
                      content="Dołączyłeś do tej randki"
                    />
                  </Item.Description>
                )}
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <Icon name="clock" /> {format(activity.date, "h:mm a")}
          <Icon name="marker" /> {activity.venue}, {activity.city}
        </Segment>
        <Segment secondary>
          <ActivityListItemAttendees attendees={activity.attendees} />
        </Segment>
        <Segment clearing>
          <span>{activity.description}</span>
          <Button
            as={Link}
            to={`/activities/${activity.id}`}
            floated="right"
            content="Zobacz"
            color="blue"
          />
          {/* {if(user.isHost == true)} */}
          <Button
            name={activity.id}
            loading={target === activity.id && submitting}
            onClick={(e) => deleteActivity(e, activity.id)}
            floated="right"
            content="Usuń"
            color="red"
          />
        </Segment>
      </Segment.Group>
    );
  } else {
    if (attendees.filter((x) => x.username === user?.username).length == 1) {
      return (
        <Segment.Group>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image
                  size="tiny"
                  circular
                  src={host.image || "/assets/user.png"}
                />
                <Item.Content>
                  <Item.Header as={Link} to={`/activities/${activity.id}`}>
                    {activity.title}
                  </Item.Header>
                  <Item.Description>
                    Stworzone przez: {host.displayName}
                  </Item.Description>
                  {activity.isHost && (
                    <Item.Description>
                      <Label
                        basic
                        color="orange"
                        content="To ty utworzyłeś tę randkę"
                      />
                    </Item.Description>
                  )}
                  {activity.isGoing && !activity.isHost && (
                    <Item.Description>
                      <Label
                        basic
                        color="green"
                        content="Dołączyłeś do tej randki"
                      />
                    </Item.Description>
                  )}
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
          <Segment>
            <Icon name="clock" /> {format(activity.date, "h:mm a")}
            <Icon name="marker" /> {activity.venue}, {activity.city}
          </Segment>
          <Segment secondary>
            <ActivityListItemAttendees attendees={activity.attendees} />
          </Segment>
          <Segment clearing>
            <span>{activity.description}</span>
            <Button
              as={Link}
              to={`/activities/${activity.id}`}
              floated="right"
              content="Zobacz"
              color="blue"
            />
          </Segment>
        </Segment.Group>
      );
    } else {
      return <Fragment />;
    }
  }
};

export default ActivityMyDates;
