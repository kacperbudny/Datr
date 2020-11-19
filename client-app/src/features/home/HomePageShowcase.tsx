import React, { useContext, Fragment } from "react";
import { Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { RootStoreContext } from "../../app/stores/rootStore";
import LoginForm from "../user/LoginForm";
import RegisterForm from "../user/RegisterForm";

export const HomePageShowcase = () => {
    const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
    return (
        <div className="showcase">
        <div className="showcase-box">
          <div className="showcase-logo">
            <Image src="/assets/logo.png" />
            <h1 className="showcase-h1">Datr</h1>
          </div>
          {isLoggedIn && user ? (
            <Fragment>
              <h2 className="showcase-h2">
                Witamy z powrotem, {user.displayName}!
              </h2>
              <div className="showcase-links">
                <Link to="/activities">
                  <button className="btn btn-primary">
                    Przejdź do panelu sterowania
                  </button>
                </Link>
              </div>
            </Fragment>
          ) : (
            <Fragment>
              <h2 className="showcase-h2">
                Bądź kim chcesz. Randkuj jak chcesz.
              </h2>
              <div className="showcase-links">
                <button
                  onClick={() => openModal(<RegisterForm />)}
                  className="btn btn-primary"
                >
                  Dołącz teraz
                </button>
                <button
                  onClick={() => openModal(<LoginForm />)}
                  className="btn"
                >
                  Zaloguj się
                </button>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    )
}
