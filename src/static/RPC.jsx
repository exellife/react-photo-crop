import React from 'react';
import { Img } from './components/Image.jsx';
import { PhotoCrop } from './components/PhotoCrop.jsx';
import { Zoom } from "./components/Zoom.jsx";
import { Buttons } from './components/Buttons.jsx';
import { RPCContext } from './context/context';
import { cropHandler } from './CropHandler';
const useContext = React.useContext;

export function useRPC() {

    return {
        getDataURL: () => cropHandler.getDataURL(),
    }
}

export function RPCButton({ styles, classes, nameValues }) {

    const { openModal } = useContext(RPCContext);
    const { modalBtn } = nameValues;

    return (
        <button className={classes.modalBtn}
            style={{ ...styles.modalBtn }}
            onClick={(e) => openModal()}
        >{modalBtn}</button>
    )
}

export function RPCModal({ styles, classes,
    ids, defaultSrc, nameValues, rpcHandler }) {

    if (!rpcHandler) throw Error(`handler function wasn't provided.`)

    const { state } = useContext(RPCContext);

    return (
        <>
            {state.open ?
                <div
                    className={classes.modal}
                    style={{ ...styles.modal }}
                >
                    <div className={classes.window}
                        style={{ ...styles.window }}>

                        <div className={classes.cropOut}
                            style={{ ...styles.cropOut }}>

                            <div className={classes.crop}
                                style={{ ...styles.crop }}>

                                <div className={classes.cropIn}
                                    style={{ ...styles.cropIn }}>

                                    <PhotoCrop
                                        id={ids.photoCrop}
                                        pcStyles={styles.photoCrop}
                                    />
                                    <Img
                                        imgStyles={styles.img}
                                        id={ids.img}
                                        defaultSrc={defaultSrc}
                                    />

                                    <div className={classes.after}
                                        style={{ ...styles.after }}></div>
                                </div>
                            </div>

                        </div>

                        <Zoom id={ids.zoom}
                            zoomStyles={styles.zoom}
                            rangeWrap={styles.rangeWrap}
                            rangeStyles={styles.range}
                            rangeVal={styles.rangeVal}

                            classNames={{
                                rangeWrapCls: classes.rangeWrap,
                                rangeValCls: classes.rangeVal,
                            }}
                        />
                        <Buttons
                            id={ids.buttons}
                            ids={{
                                buttonsId: ids.buttons,
                                inputFileId: ids.inputFileBtn, 
                            }}
                            classNames={{
                                cancelBtn: classes.cancelBtn,
                                actionBtn: classes.actionBtn,
                                inputFileBtn: classes.inputFileBtn,
                            }}
                            btnStyles={{
                                actionBtnStyle: styles.actionBtn,
                                cancelBtnStyle: styles.cancelBtn,
                                buttonStyles: styles.buttons,
                                inputFileBtnStyles: styles.inputFileBtn
                            }}
                            btnNames={{
                                cancelBtnName: nameValues.cancelBtn,
                                actionBtnName: nameValues.actionBtn,
                            }}
                            rpcHandler={rpcHandler}
                        />
                    </div>
                    
                </div>
                :
                null}
        </>
    )
};


