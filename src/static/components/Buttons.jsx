import React from 'react';

import { RPCContext } from "../context/context";
const useContext = React.useContext;


export function Buttons({ ids, btnStyles, btnNames, classNames, rpcHandler }) {

    const { buttonId, inputFileId } = ids;
    const { closeModal, setImageSrc } = useContext(RPCContext);

    const { actionBtn, cancelBtn, inputFileBtn } = classNames;
    const {
        actionBtnStyle,
        cancelBtnStyle,
        buttonStyles,
        inputFileBtnStyles,
    } = btnStyles;
    const { actionBtnName, cancelBtnName } = btnNames;

    function downloadFile(e) {

        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = (evt) => {

                setImageSrc(reader.result);
            }

            if (file.type && file.type.indexOf('image') === -1) {
                throw Error(`File is not an image: ${file.type}, ${file}`)
            }

            reader.readAsDataURL(file);
        }
    }

    function uploadHandler(e) {
        rpcHandler(e)
        closeModal();
    }

    return (
        <div id={buttonId} style={{ ...buttonStyles }}>


            <input
                type="file"
                accept="image/png, image/jpeg, image/webp"
                id={inputFileId}
                style={{ ...inputFileBtnStyles }}
                className={inputFileBtn}
                onChange={(e) => downloadFile(e)}
            />
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