import React from 'react';
import { RPCContext } from '../context/context';
const useEffect = React.useEffect;
const useRef = React.useRef;
const useContext = React.useContext;

export function PhotoCrop({ id, pcStyles, classNames }) {

    const { setBoundaries } = useContext(RPCContext);

    const pcRef = useRef();

    useEffect(() => {
        setBoundaries(pcRef.current);
    }, [])

    return (
        <div
            id={id}
            style={{ ...pcStyles }}
            ref={pcRef}
            className={classNames}
        >
        </div>
    )
}