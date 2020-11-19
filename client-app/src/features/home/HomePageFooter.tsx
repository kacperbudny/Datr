import React, { useContext } from "react";
import RegisterForm from "../user/RegisterForm";
import { RootStoreContext } from "../../app/stores/rootStore";

export const HomePageFooter = () => {
  const rootStore = useContext(RootStoreContext);
  const { openModal } = rootStore.modalStore;
  return (
    <div className="conversion-section">
      <h2>Przekonany?</h2>
      <p>Nic nie tracisz. Możesz jedynie zyskać.</p>

      <button
        onClick={() => openModal(<RegisterForm />)}
        className="btn btn-primary"
      >
        Dołącz do nas
      </button>
    </div>
  );
};
