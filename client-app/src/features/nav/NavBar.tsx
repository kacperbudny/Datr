import React, { useContext } from "react";
import { Menu, Container, Button, Dropdown, Image } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { NavLink, Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";

const NavBar: React.FC = () => {
  const rootStore = useContext(RootStoreContext);
  const { user, logout } = rootStore.userStore;

  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header as={NavLink} exact to="/">
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          />
          Datr
        </Menu.Item>
        <Menu.Item name="Randki" as={NavLink} to="/activities" />
        <Menu.Item name="Moje Randki" as={NavLink} to="/mydates" />
        <Menu.Item>
          <Button
            as={NavLink}
            to="/createActivity"
            positive
            content="Utwórz randkę"
          />
        </Menu.Item>
        {user && (
          <Menu.Item position="right">
            <Image avatar spaced="right" src={user.image || "/assets/user.png"} />
            <Dropdown pointing="top left" text={user.displayName}>
              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to={`/profile/username`}
                  text="Mój profil"
                  icon="user"
                />
                <Dropdown.Item
                  as={Link}
                  to={`/editAvatar`}
                  text="Mój avatar"
                  icon="user circle outline"
                />
                <Dropdown.Item onClick={logout} text="Wyloguj" icon="power" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default observer(NavBar);
