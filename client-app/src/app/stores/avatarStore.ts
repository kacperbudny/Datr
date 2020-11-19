import { observable, action } from "mobx";
import { IAvatar } from "../models/user";
import { RootStore } from "./rootStore";

export default class AvatarStore {
  rootStore: RootStore;
  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
  }

  @observable avatar: IAvatar = {
    hair: "m_wlosy1",
    eyebrows: "brwi",
    clothes: "m_bluzka1",
    eyes: "oczy",
    mouth: "usta",
  };

  @action changeHair = (newHair: string) => {
    this.avatar.hair = newHair;
  }
}
