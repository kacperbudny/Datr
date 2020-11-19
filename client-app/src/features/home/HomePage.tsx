import React, { useContext, Fragment } from "react";
import { RootStoreContext } from "../../app/stores/rootStore";
import { HomePageShowcase } from "./HomePageShowcase";
import { HomePageSection } from "./HomePageSection";
import { HomePageFooter } from "./HomePageFooter";

const HomePage = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  return (
    <Fragment>
      <HomePageShowcase />
      {isLoggedIn && user ? (
        <Fragment></Fragment>
      ) : (
        <Fragment>
          <HomePageSection
            isPrimary={true}
            iconName="privacy"
            headerText="Całkowita anonimowość"
            paragraphText="Korzystając z Datr możesz randkować całkowicie anonimowo. Brzmi
                absurdalnie? Nasi zadowoleni użytkowicy twierdzą inaczej.
                Przekonaj się sam."
          />
          <HomePageSection
            isPrimary={false}
            iconName="male"
            headerText="Wyrażaj siebie"
            paragraphText="Dajemy Ci całą paletę środków do przedstawienia siebie dokładnie
                takim, jakim chciałbyś być. To, jak z nich skorzystasz, zależy
                tylko od Ciebie."
          />
          <HomePageSection
            isPrimary={true}
            iconName="challenge"
            headerText="Koniec z nieśmiałością"
            paragraphText="Problemy z rozmawianiem z ludźmi? Możesz się z nimi pożegnać.
                Dzięki codziennym wyzwaniom w Datr, pomożemy Ci zwalczyć swoje
                obawy przed kontaktem z ludźmi."
          />
          <HomePageFooter />
        </Fragment>
      )}
    </Fragment>
  );
};

export default HomePage;
