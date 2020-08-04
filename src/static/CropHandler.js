class CropHandler {

    constructor() {
        this.imgInstance = null;
        this.boundaries = {};
        this._imageSrc = {};
        this.canvas = null;
        this.size = { width: '', height: '' };
    }

    set imageSrc(src) {
        this._imageSrc = src;
    }

    setBoundaries(_boundaries) {
        this.boundaries = { ..._boundaries };
    }

    setImageBounds(_imgBounds) {
        this.imageBounds = { ..._imgBounds };
    }

    setCanvas(canvas) {
        this.canvas = canvas;
    }

    setSize(size) {
        this.size = { ...size };
    }

    getDataURL(id = 'rpc-img') {
        if (!id) id = 'rpc-img';
        const imgOriginal = document.getElementById(id);
        if (!imgOriginal) throw Error(`Could not find any image with id ${id}... if you changed default styles, make sure to pass an 'id' to useRPC.getDataURL function in the component where it called`);

        // original width and height
        const [oWidth, oHeight] = [imgOriginal.width, imgOriginal.height];

        let flag = false;
        let count = 20;
        let dataURL = '';

        const canvas = document.createElement('canvas');
        canvas.width = 240;
        canvas.height = 240;
        const ctx = canvas.getContext('2d');

        const targetPoints = this.boundaries;
        const imagePoints = this.imageBounds;

        const sx = targetPoints.left - imagePoints.left;
        const sy = targetPoints.top - imagePoints.top;
        const [sWidth, sHeight] = [240, 240];

        let img = new Image(oWidth, oHeight);

        img.onload = () => {

            const imgCanvas = document.createElement('canvas');
            imgCanvas.width = oWidth;
            imgCanvas.height = oHeight;
            const imgCtx = imgCanvas.getContext('2d');

            imgCtx.drawImage(img, 0, 0, oWidth, oHeight);
            ctx.drawImage(imgCanvas, sx, sy, sWidth, sHeight,
                0, 0, 240, 240);

            dataURL = canvas.toDataURL('image/jpeg', 0.8);
            flag = true;
        }

        img.src = this._imageSrc;

        return new Promise((resolve, reject) => {
            function checkFlag() {
                if (count) {
                    count--;
                    if (flag) resolve(dataURL);
                    if (!flag) setTimeout(checkFlag, 300);
                } else {
                    reject('There is an issues reeding file');
                }
            }
            checkFlag();
        })
    }

    // dataURL(canvas, type) {
    //     return canvas.toDataURL(type, 1);
    // }
}

export const cropHandler = new CropHandler();