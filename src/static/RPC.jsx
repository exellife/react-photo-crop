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

    if (!styles || !classes || !nameValues)
        throw Error('most likely RPCStyles configs were not passed to component -> RPCButton');

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
    ids, nameValues, defaultSrc, rpcHandler }) {

    if (!styles || !classes || !ids || !nameValues)
        throw Error('most likely RPCStyles configs were not passed to component -> RPCModal');

    if (!defaultSrc) throw Error('default image source was not provided to component -> RPCModal ');

    if (!rpcHandler) throw Error(`handler function wasn't provided to component -> RPCModal`);

    const { state } = useContext(RPCContext);

    return (
        <>
            {state.open ?

                <div
                    className={classes.modal.join(" ")}
                    style={{ ...styles.modal }}
                >
                    <div className={classes.window.join(" ")}
                        style={{ ...styles.window }}>

                        <div className={classes.cropOut.join(" ")}
                            style={{ ...styles.cropOut }}>

                            <div className={classes.crop.join(" ")}
                                style={{ ...styles.crop }}>

                                <div className={classes.cropIn.join(" ")}
                                    style={{ ...styles.cropIn }}>

                                    <PhotoCrop
                                        classNames={classes.photoCrop.join(" ")}
                                        id={ids.photoCrop}
                                        pcStyles={styles.photoCrop}
                                    />
                                    <Img
                                        imgStyles={styles.img}
                                        id={ids.img}
                                        defaultSrc={defaultSrc}
                                        classNames={classes.img.join(" ")}
                                    />

                                    <div className={classes.after.join(" ")}
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
                                rangeWrapCls: classes.rangeWrap.join(' '),
                                rangeValCls: classes.rangeVal.join(' '),
                            }}
                        />
                        <Buttons
                            id={ids.buttons}
                            ids={{
                                buttonsId: ids.buttons,
                                inputFileId: ids.inputFileBtn,
                            }}
                            classNames={{
                                cancelBtn: classes.cancelBtn.join(' '),
                                actionBtn: classes.actionBtn.join(' '),
                                inputFileBtn: classes.inputFileBtn.join(' '),
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


