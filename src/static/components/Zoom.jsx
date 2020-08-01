import React from 'react';
import { RPCContext } from '../context/context';
const useState = React.useState;
const useContext = React.useContext;


export function Zoom({ id, zoomStyles, rangeWrap,
    rangeStyles, rangeVal, classNames }) {

    const { zoom } = useContext(RPCContext);

    const [value, setValue] = useState(0);
    const { rangeWrapCls, rangeValCls } = classNames;

    function handleRange(e) {
        e.preventDefault();
        zoom(+e.target.value); // requires digit
        setValue(e.target.value);
    }

    return (
        <div
            id={id}
            style={{ ...zoomStyles }}
        >
            <div className={rangeWrapCls} style={{ ...rangeWrap }}>

                <input id="rpc-range" type="range" min="0" max="5" value={value}
                    onChange={(e) => handleRange(e)} step="1"
                    style={{ ...rangeStyles }}
                />

                <span className={rangeValCls} style={{ ...rangeVal }}>{value}</span>
            </div>
        </div>
    )
}