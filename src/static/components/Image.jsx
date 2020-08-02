import React from 'react';

import { evaluatePosition } from '../utils';
import { RPCContext } from '../context/context';
const useEffect = React.useEffect;
const useState = React.useState;
const useContext = React.useContext;
const useRef = React.useRef;

function coords() {
    const coords = { x: null, y: null };

    function X() {
        return coords.x;
    }

    function Y() {
        return coords.y;
    }

    function setX(x) {
        coords.x = x;
    }

    function setY(y) {
        coords.y = y;
    }

    function getCoords() {
        return coords;
    }

    return {
        X,
        Y,
        setX,
        setY,
        getCoords,
    }
}

export function Img({ id, imgStyles, classNames }) {

    const {
        state, setDimensions,
        setTransform, setImageBounds,
    } = useContext(RPCContext)

    const imgRef = useRef();

    const imageSrc = state.imageSrc ? state.imageSrc : '';

    const [listen, setListen] = useState(false);
    const _coords = coords();
    useEffect(() => {
        setTransform('translate3d(-50%, -50%, 0)');
        setDimensions(imageSrc);

        const {
            top, bottom,
            left, right,
        } = imgRef.current.getBoundingClientRect();
        setImageBounds({ top, bottom, left, right });
    }, [imageSrc]);

    useEffect(() => {
        const {
            top, bottom,
            left, right,
        } = imgRef.current.getBoundingClientRect();
        setImageBounds({ top, bottom, left, right });
    }, [state.imageConfig]);

    // useEffect(() => {
    //     const el = imgRef.current;
    //     if (listen) el.addEventListener('mousemove', mouseMove);
    //     return () => {
    //         el.removeEventListener('mousemove', mouseMove);
    //     }
    // }, [listen]);

    function mouseMove(evt) {
        if (listen) {

            const el = evt.target;
            const { clientX, clientY } = evt;
            const {
                top, bottom,
                left, right,
            } = el.getBoundingClientRect();
            setImageBounds({ top, bottom, left, right });

            if (!_coords.X()) _coords.setX(clientX);
            if (!_coords.Y()) _coords.setY(clientY);

            const [x, y] = [_coords.X(), _coords.Y()];

            /**
             * @param {String} direction - `left` | `right` | `up` | `down`
             */
            function _toTransform(direction) {
                const position = state.imageConfig.transform;
                // x, y, z
                let [a, b, c] = evaluatePosition(position);

                // TODO test this
                direction === 'right' ? a++ :
                    direction === 'left' ? a-- :
                        direction === 'down' ? b++ :
                            direction === 'up' ? b-- : null;


                const toTransform = `translate3d(${a}%, ${b}%, ${c})`;
                setTransform(toTransform);
            }

            // indentify in which direction mouse is moving
            if (clientX > x) { // mouse right move

                _coords.setX(clientX - 1); // always one behind

                // check if left bound is not exceeding allowed boundaries
                if (left < state.boundaries.left) {
                    _toTransform('right');
                }
            }

            if (clientX < x) {
                // mouse left move
                _coords.setX(clientX + 1); // always one infront

                // check if right bound is not exceeding allowed boundaries
                if (right > state.boundaries.right) {
                    _toTransform('left');
                }
            }

            if (clientY > y) {
                // mouse down move
                _coords.setY(clientY - 1); // always one behind

                // check if top bound is not exceeding allowed boundaries
                if (top < state.boundaries.top) {
                    _toTransform('down')
                }

            }

            if (clientY < y) {
                // mouse up move
                _coords.setY(clientY + 1); // always one infront

                // check if bottom bound is not exceeding allowed boundaries
                if (bottom > state.boundaries.bottom) {
                    _toTransform('up')
                }
            }
        }
    }

    function mouseDown(e) {
        // start listening for mousemove event
        setListen(true);
    }

    function mouseUp(e) {
        // stop listening for mousemove event
        setListen(false);
    }

    function mouseLeave(e) {
        setListen(false);
    }

    return (

        <img src={imageSrc} alt="image being cropped..."
            ref={imgRef}
            id={id}
            draggable={false}
            style={{
                ...imgStyles,
                ...state.imageConfig,
            }}
            onMouseDown={(e) => mouseDown(e)}
            onMouseUp={(e) => mouseUp(e)}
            onMouseMove={(e) => mouseMove(e)}
            onMouseLeave={e => mouseLeave(e)}
            className={classNames}
        />

    )
}