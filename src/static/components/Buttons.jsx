import React from 'react';

import { RPCContext } from "../context/context";
const useContext = React.useContext;


export function Buttons({ ids, btnStyles, btnNames, classNames, rpcHandler }) {

    const { buttonId } = ids;
    const { closeModal } = useContext(RPCContext);

    const { actionBtn, cancelBtn } = classNames;
    const {
        actionBtnStyle,
        cancelBtnStyle,
        buttonStyles,
    } = btnStyles;
    const { actionBtnName, cancelBtnName } = btnNames;

    function uploadHandler(e) {
        rpcHandler(e)
        closeModal();
    }

    return (
        <div id={buttonId} style={{ ...buttonStyles }}>
            <button
                style={{ ...actionBtnStyle }}
                className={actionBtn}
                onClick={(e) => uploadHandler(e)}
            >{actionBtnName}</button>
            <button
                style={{ ...cancelBtnStyle }}
                className={cancelBtn}
                onClick={(e) => closeModal()}
            >{cancelBtnName}</button>
        </div >
    )
}