import React from "react";
import { List, Image, Popup, Card, Item } from "semantic-ui-react";
import { IAttendee } from "../../../app/models/activity";

interface IProps {
  attendees: IAttendee[];
}

const ActivityListItemAttendees: React.FC<IProps> = ({ attendees }) => {
  function getAge(birthDate: Date) {
    var date = new Date(birthDate);
    var timeDiff = Math.abs(Date.now() - date.getTime());
    var age = Math.floor(timeDiff / (1000 * 3600 * 24) / 365);
    return age;
  }

  function getGender(gender: string){
      if(gender == "M"){
          return "Mężczyzna"
      } else {
          return "Kobieta"
      }
  }
  
  return (
    <List horizontal>
      {attendees.map((attendee) => (
        <List.Item key={attendee.username}>
          <Popup
            trigger={
              <Image
                size="mini"
                circular
                src={attendee.image || "/assets/user.png"}
              />
            }
          >
            <Popup.Content>
              <Item.Group>
                <Item>
                  <Item.Image
                    size="tiny"
                    src={attendee.image || "/assets/user.png"}
                  />
                    <Item.Content>
                    <Item.Header as='a'>{attendee.displayName}</Item.Header>
                    <Item.Meta>
                      {getGender(attendee.userGender)} {getAge(attendee.birthDate)} Lat {attendee.userCity}
                    </Item.Meta>
                    <Item.Description>
                      {attendee.userDescription}
                    </Item.Description>
                    <Item.Extra>{attendee.interests}</Item.Extra>
                    </Item.Content>
                </Item>
              </Item.Group>
            </Popup.Content>
          </Popup>
        </List.Item>
      ))}
    </List>
  );
};
export default ActivityListItemAttendees;
