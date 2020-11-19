import React, { Fragment, useContext } from "react";
import { Button, Image } from "semantic-ui-react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { observer } from "mobx-react-lite";

const AvatarButtons = () => {
  const rootStore = useContext(RootStoreContext);
  const { user } = rootStore.userStore;
  const { changeHair } = rootStore.avatarStore;

  return (
    <div>
      <h2>Opcje avatara</h2>
      <h3>Włosy</h3>
      {user?.userGender === "M" ? (
        <Fragment>
          <Button className="avatar-items" onClick={() => {changeHair("m_wlosy1")}}>
            <Image src="avatars/elements/m_wlosy1.png" />
          </Button>
          <Button className="avatar-items" onClick={() => {changeHair("m_wlosy2")}}>
            <Image src="avatars/elements/m_wlosy2.png" />
          </Button>
          <Button className="avatar-items">
            <Image src="avatars/elements/m_wlosy3.png" />
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <Button className="avatar-items">
            <Image src="avatars/elements/f_wlosy1.png" />
          </Button>
          <Button className="avatar-items">
            <Image src="avatars/elements/f_wlosy2.png" />
          </Button>
          <Button className="avatar-items">
            <Image src="avatars/elements/f_wlosy3.png" />
          </Button>
        </Fragment>
      )}

      <h3>Oczy</h3>
      <Button className="avatar-items">
        <Image src="avatars/elements/oczy.png" />
      </Button>
      <Button className="avatar-items">
        <Image src="avatars/elements/oczy2.png" />
      </Button>
      <Button className="avatar-items">
        <Image src="avatars/elements/oczy3.png" />
      </Button>
      <h3>Brwi</h3>
      <Button className="avatar-items">
        <Image src="avatars/elements/brwi.png" />
      </Button>
      <Button className="avatar-items">
        <Image src="avatars/elements/brwi2.png" />
      </Button>
      <Button className="avatar-items">
        <Image src="avatars/elements/brwi3.png" />
      </Button>
      <Button className="avatar-items">
        <Image src="avatars/elements/brwi4.png" />
      </Button>
      <h3>Ubranie</h3>
      {user?.userGender === "M" ? (
        <Fragment>
          <Button className="avatar-items">
            <Image src="avatars/elements/m_bluzka1.png" />
          </Button>
          <Button className="avatar-items">
            <Image src="avatars/elements/m_bluzka2.png" />
          </Button>
          <Button className="avatar-items">
            <Image src="avatars/elements/m_bluzka3.png" />
          </Button>
        </Fragment>
      ) : (
        <Fragment>
          <Button className="avatar-items">
            <Image src="avatars/elements/f_bluzka1.png" />
          </Button>
          <Button className="avatar-items">
            <Image src="avatars/elements/f_bluzka2.png" />
          </Button>
          <Button className="avatar-items">
            <Image src="avatars/elements/f_bluzka3.png" />
          </Button>
        </Fragment>
      )}
      <h3>Usta</h3>
      <Button className="avatar-items">
        <Image src="avatars/elements/usta.png" />
      </Button>
      <Button className="avatar-items">
        <Image src="avatars/elements/usta2.png" />
      </Button>
      <Button className="avatar-items">
        <Image src="avatars/elements/usta3.png" />
      </Button>
      <Button className="avatar-items">
        <Image src="avatars/elements/usta4.png" />
      </Button>
    </div>
  );
};

export default observer(AvatarButtons);
