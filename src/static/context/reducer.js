export const types = {
    open: 'open',
    close: 'close',
    setImageConfig: 'setImageConfig',
    setBoundaries: 'setBoundaries',
    setMouseCoords: 'setMouseCoords',
    setImageSrc: 'setImageSrc',
}

export const initState = {
    open: false,
    imageConfig: {
        width: '',
        height: '',
        top: '50%',
        left: '50%',
        transform: '',
    },
    boundaries: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    imageSrc: '',
}

export function reducer(state = initState, action) {
    switch (action.type) {
        case types.open:
            return { ...state, open: true };
        case types.close:
            return { ...state, open: false };
        case types.setImageConfig:
            return {
                ...state,
                imageConfig: {
                    ...state.imageConfig,
                    ...action.payload,
                }
            }
        case types.setBoundaries:
            return {
                ...state,
                boundaries: { ...action.payload },
            }
        case types.setMouseCoords:
            return {
                ...state,
                mouseCoords: { ...action.payload }
            }
        case types.setImageSrc: {
            return {
                ...state,
                imageSrc: action.payload
            }
        }
        default:
            throw Error('Shouldn\'t have happend')
    }
}