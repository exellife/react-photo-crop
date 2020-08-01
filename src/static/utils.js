export function delay(time, cb = null) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve.bind(null, cb), time)
    });
}

/**
 * @param {String} str
 */
export function evaluatePosition(str) {
    const reg = /([\-]?\d+)/gm;
    const data = str.match(reg);
    return [+data[1], +data[2], +data[3]];
}
