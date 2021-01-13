import React, { createContext, useState, useContext } from "react";
import { Modal } from "react-bootstrap";

export const PopupContext = createContext();
export const usePopup = () => {
    return useContext(PopupContext);
};

function PopupProvider(props) {
    const [popup, showPopup] = useState(false);

    return (
        <PopupContext.Provider value={{ popup, showPopup }} >
            {props.children}
            <Modal show={popup != false} onHide={() => showPopup(false)} dialogClassName="custom-model" contentClassName="custom-dialog">
                {popup}
            </Modal>
        </PopupContext.Provider>
    );
}

export default PopupProvider;
