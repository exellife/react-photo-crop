import React from 'react';
import { RPCContext } from './context';
import { types, reducer, initState } from './reducer';
import { cropHandler } from "../CropHandler";

const useReducer = React.useReducer;

export function RPCCtxState({ children }) {

    const [state, dispatch] = useReducer(reducer, initState);

    function openModal() {
        dispatch({
            type: types.open,
        })
    }

    function closeModal() {
        dispatch({
            type: types.close,
        })
    }

    function setImageSrc(dataURL) {

        cropHandler.image = dataURL;

        dispatch({
            type: types.setImageSrc,
            payload: dataURL,
        });
    }

    /**
     * 
     * @param {Number} defaultSrc - photo url
     */
    function setDimensions(defaultSrc) {

        // check if height > width
        // if it is
        // set imgStyles.height = '100%';
        // set imgStyles.width = 'auto';
        // if not
        // do the opposite
        // finaly pass img instance to CropHandler
        const [a, b] = ['100%', 'auto'];
        let h, w;
        let img = new Image();
        img.onload = function () {

            [h, w] = img.height > img.width ? [b, a] : [a, b];

            dispatch({
                type: types.setImageConfig,
                payload: { width: w, height: h }
            });

            
        }
        img.src = defaultSrc;
        cropHandler.imageSrc = defaultSrc;
    }

    /**
     * 
     * @param {*} el  
     */
    function setBoundaries(el) {
        // top -> top Y coordinate
        // bottom -> bottom Y coordinate
        // left -> left X coordinate
        // right -> right X coordiante
        const {
            top, bottom,
            left, right,
        } = el.getBoundingClientRect();
        dispatch({
            type: types.setBoundaries,
            payload: { top, bottom, left, right }
        });
        cropHandler.setBoundaries({ top, bottom, left, right });
    }

    function setImageBounds(bounds) {
        cropHandler.setImageBounds(bounds)
    }

    function setCanvas(canvas) {
        cropHandler.setCanvas(canvas);
    }

    /**
     * 
     * @param {String} toTransform - e.g `translate3d(-50%, 20%, 2%)` 
     */
    function setTransform(toTransform) {
        dispatch({
            type: types.setImageConfig,
            payload: { transform: toTransform }
        });
    }

    /**
     * 
     * @param {Number} n - `1` to `5`; 
     */
    function zoom(n) {
        if (n > 5 || n < 0) return;
        let size =
            n === 0 ? 100 :
                n === 1 ? 120 :
                    n === 2 ? 140 :
                        n === 3 ? 160 :
                            n === 4 ? 180 :
                                n === 5 ? 200 : null;

        const { width, height } = state.imageConfig;

        if (width === 'auto') {
            cropHandler.setSize({ width, height: `${size}%` })
            dispatch({
                type: types.setImageConfig,
                payload: {
                    width, height: `${size}%`,
                    transform: 'translate3d(-50%, -50%, 0)',
                }
            })
        } else {
            cropHandler.setSize({ width: `${size}%`, height })
            dispatch({
                type: types.setImageConfig,
                payload: {
                    width: `${size}%`, height,
                    transform: 'translate3d(-50%, -50%, 0)',
                }
            });
        }




        
    }

    function doTheJob() {
        return cropHandler.calculate();
    }

    return (
        <RPCContext.Provider
            value={{
                setBoundaries,
                setDimensions,
                setTransform,
                setImageBounds,
                setImageSrc,
                setCanvas,
                zoom,
                closeModal,
                openModal,
                doTheJob,

                state: state,
            }}
        >
            {children}
        </RPCContext.Provider>
    )
} 