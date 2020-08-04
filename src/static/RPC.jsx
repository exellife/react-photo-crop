import React from 'react';
import { Img } from './components/Image.jsx';
import { PhotoCrop } from './components/PhotoCrop.jsx';
import { Zoom } from "./components/Zoom.jsx";
import { Buttons } from './components/Buttons.jsx';
import { RPCContext } from './context/context';
import { cropHandler } from './CropHandler';
const useContext = React.useContext;
const useEffect = React.useEffect;
const useRef = React.useRef;

export function useRPC() {

    return {
        getDataURL: (q = 0.85) => cropHandler.getDataURL(q),
    }
}


export function RPCButton({ styles, classes, nameValues, ids }) {

    // click the button
    // open file browser
    // see if user selected a file
    // if yes, open modal with photo crop
    // if not (user decided to not upload a new image)
    // do nothing

    const inputRef = useRef();

    const {
        state,
        setImageSrc
    } = useContext(RPCContext);

    useEffect(() => {
        if (!state.open) inputRef.current.value = "";
    }, [state.open]);

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

    return (

        // <button className={classes.modalBtn.join(' ')}
        //     style={{ ...styles.modalBtn }}
        //     onClick={(e) => openModal()}
        // >{modalBtn}</button>
        <label htmlFor={ids.inputFileBtn} style={{ ...styles.inputFileBtnStyles }}
            className={classes.inputFileBtn.join(" ")}>
            {nameValues.inputFileBtn}
            <input
                ref={inputRef}
                type="file"
                accept="image/png, image/jpeg, image/webp"
                id={ids.inputFileBtn}
                onChange={(e) => downloadFile(e)}
                style={{ visibility: 'hidden', width: '0.1px' }}
            />
        </label>
    )
}


// export function RPCButton({ styles, classes, nameValues }) {

//     if (!styles || !classes || !nameValues)
//         throw Error('most likely RPCStyles configs were not passed to component -> RPCButton');

//     const { openModal } = useContext(RPCContext);
//     const { modalBtn } = nameValues;

//     return (
//         <button className={classes.modalBtn.join(' ')}
//             style={{ ...styles.modalBtn }}
//             onClick={(e) => openModal()}
//         >{modalBtn}</button>
//     )
// }

export function RPCModal({ styles, classes,
    ids, nameValues, rpcHandler }) {

    if (!styles || !classes || !ids || !nameValues)
        throw Error('most likely RPCStyles configs were not passed to component -> RPCModal');

    // if (!defaultSrc) throw Error('default image source was not provided to component -> RPCModal ');

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
                            }}
                            classNames={{
                                cancelBtn: classes.cancelBtn.join(' '),
                                actionBtn: classes.actionBtn.join(' '),
                            }}
                            btnStyles={{
                                actionBtnStyle: styles.actionBtn,
                                cancelBtnStyle: styles.cancelBtn,
                                buttonStyles: styles.buttons,
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


