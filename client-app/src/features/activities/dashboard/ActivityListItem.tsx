import React, { Fragment, useContext } from "react";
import { Item, Button, Segment, Icon, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IActivity } from "../../../app/models/activity";
import { format } from "date-fns";
import ActivityListItemAttendees from "./ActivityListItemAttendees";
import { RootStoreContext } from "../../../app/stores/rootStore";

const ActivityListItem: React.FC<{ activity: IActivity }> = ({ activity }) => {
  const host = activity.attendees.filter((x) => x.isHost)[0];
  const singleAttendee = activity.attendees.length;
  if (singleAttendee === 1) {
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
};

export default ActivityListItem;
