import React, { Fragment } from "react";
import {
  Segment,
  Item,
  Label,
  Image,
  List,
  Popup,
  Modal,
} from "semantic-ui-react";
import { Link } from "react-router-dom";
import { IAttendee } from "../../../app/models/activity";
import { observer } from "mobx-react-lite";
import { relative } from "path";

interface IProps {
  attendees: IAttendee[];
}
function getAge(birthDate: Date) {
  var date = new Date(birthDate);
  var timeDiff = Math.abs(Date.now() - date.getTime());
  var age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
  return age;
}

function getGender(gender: string) {
  if (gender == "M") {
    return "Mężczyzna";
  } else {
    return "Kobieta";
  }
}

const ActivityDetailedSidebar: React.FC<IProps> = ({ attendees }) => {
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondaryinverted="true"
        color="teal"
      >
        {attendees.length} {attendees.length === 1 ? "Osoba" : "Ludzi"} randkuje
      </Segment>
      <Segment attached>
        <List relaxed divided>
          {attendees.map((attendee) => (
            <Modal
              trigger={
                <Item key={attendee.username} style={{ position: "relative" }}>
                  {attendee.isHost && (
                    <Label
                      style={{ position: "absolute" }}
                      color="orange"
                      ribbon="right"
                    >
                      Założyciel
                    </Label>
                  )}
                  <Image
                    size="tiny"
                    src={attendee.image || "/assets/user.png"}
                  />
                  <Item.Content verticalAlign="middle">
                    <Item.Header as="h3">
                      <Link to={`/profile/${attendee.username}`}>
                        {attendee.displayName}
                      </Link>
                    </Item.Header>
                    <Item.Extra style={{ color: "orange" }}>
                      Randkuje
                    </Item.Extra>
                  </Item.Content>
                </Item>
              }
            >
              <Modal.Content>
                <Item.Group >
                  <Item>
                    <Item.Image
                      size="medium"
                      src={attendee.image || "/assets/user.png"}
                    />
                    <Item.Content>
                      <Item.Header >
                        {attendee.displayName}
                      </Item.Header>
                      <Item.Meta>
                        {getGender(attendee.userGender)}{" "}
                        {getAge(attendee.birthDate)} Lat {attendee.userCity}
                      </Item.Meta>
                      <Item.Content>
                      <Item.Description>O mnie</Item.Description>
                      <Item.Description>
                        {attendee.userDescription}
                      </Item.Description>
                      </Item.Content>
                      <Item.Extra>Zainteresowania</Item.Extra>
                      <Item.Extra>{attendee.interests}</Item.Extra>
                    </Item.Content>
                  </Item>
                </Item.Group>
              </Modal.Content>
            </Modal>
          ))}
        </List>
      </Segment>
    </Fragment>
  );
};

export default observer(ActivityDetailedSidebar);
