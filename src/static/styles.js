class Styles {

    constructor() {
        this.styles = {
            modal: {
                position: 'absolute',
                top: '0',
                bottom: '0',
                right: '0',
                left: '0',
                background: `rgba(0, 0, 0, 0.74)`,
            },
            window: {
                position: 'relative',
                top: '15%',
                margin: '0 auto',
                padding: '20px',
                maxWidth: '600px',
                background: 'rgb(0, 0, 0)',
                borderRadius: '2px',
                boxShadow: '', // todo
                display: 'flex',
                flexDirection: 'column',
            },
            cropOut: {
                position: 'relative',
                padding: '12px 12px 20px',
                overflow: 'hidden',
                background: 'transparent',
            },
            crop: {
                padding: '20px',
            },
            cropIn: {
                margin: 'auto',
                width: '240px',
                height: '240px',
                position: 'relative',
            },
            photoCrop: {
                width: '100%',
                height: '100%',
                position: 'relative',
            },
            img: {
                position: 'absolute',
                cursor: 'move',
            },
            after: {
                content: '',
                position: 'absolute',
                boxShadow: '0 0 100vw 10vh rgba(0, 0, 0, 0.788)',
                top: '0',
                bottom: '0',
                left: '0',
                right: '0',
                borderRadius: '100%',
                pointerEvents: 'none',
            },
            modalBtn: {

            },
            zoom: {
                padding: '8px',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },
            rangeWrap: {
                boxSizing: 'border-box',
                padding: '8px',
                width: '260px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',

            },
            range: {
                width: '100%',
                cursor: 'pointer',
            },
            rangeVal: {
                marginLeft: '4px',
            },
            buttons: {
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '10px 10px 0'
            },
            cancelBtn: {

            },
            actionBtn: {

            },
            inputFileBtn: {

            }
        }

        this.classes = {
            modal: 'rpc-modal',
            window: 'rpc-window',
            cropOut: 'rpc-crop-out',
            crop: 'rpc-crop',
            cropIn: 'rpc-crop-in',
            after: 'rpc-after',
            modalBtn: 'rpc-btn',
            rangeWrap: 'rpc-range-wrap',
            rangeVal: 'rpc-range-val',
            cancelBtn: 'rpc-cancel-btn',
            actionBtn: 'rpc-action-btn',
            inputFileBtn: 'rpc-input-file',
        }

        this.ids = {
            photoCrop: 'rpc-photo-crop',
            img: 'rpc-img',
            zoom: 'rpc-zoom',
            buttons: 'rpc-buttons',
            inputFileBtn: 'rpc-input-file-btn'
        }

        this.nameValues = {
            modalBtn: 'Upload',
            cancelBtn: 'Cancel',
            actionBtn: 'Upload',
        }
    }

    /**
     * `addStyle` adds a new style to `target` element
     * or overrides existing style
     * `Example: addStyle('modalBtn', { background: "#fff", fontSize: "14px" })`
     * 
     * @param {String} target - available options are: 'modal', `window`, `cropOut`,
     * `crop`, `cropIn`, `photoCrop`, `img`, `after`, `modalBtn`, `zoom`, `rangeWrap`, `range`, `rangeVal`, `buttons`, `cancelBtn`, `actionBtn`, `inputFileBtn`
     * @param {{}} style - style to add
     * `e.g { color: 'green' }`;
     */
    addStyle(target, style) {
        const targets = [
            'modal', 'window', 'cropOut',
            'crop', 'cropIn', 'photoCrop', 'img',
            'after', 'modalBtn', 'zoom', 'rangeWrap',
            'range', 'rangeVal', 'buttons', 'cancelBtn', 'actionBtn', 'inputFileBtn'
        ]
        
        for (const k in this.styles) {
            if (k === target) {
                this.styles[k] = { ...this.styles[k], ...style }
            } 
        }
    }

    // changeClassName() {
    //     modal,
    //     window,
    //     cropOut,
    //     crop,
    //     cropIn,
    //     after,
    //     modalBtn,
    //     rangeWrap,
    //     rangeVal,
    //     cancelBtn,
    //     actionBtn,
    //     inputFileBtn,
    // }


    /**
     * `setBtnName` sets a new name for a given target button
     * 
     * @param {String} target - avalibale options are: `modalBtn`, `actionBtn` and `cancelBtn`
     * @param {*} name - name to set
     */
    setBtnName(target, name) {
        this.nameValues[target] = name;
    }

    get config() {
        return {
            styles: this.styles,
            classes: this.classes,
            ids: this.ids,
            nameValues: this.nameValues,
        }
    }
}

export const RPCStyles = new Styles();