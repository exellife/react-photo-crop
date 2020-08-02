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

/**
 * @param {{}} obj - object of key value pairs, where value is an array to add to
 * @param {String} target - target element
 * @param {String | String[]} classNames - classNames to add
 */
export function addToArray(obj, target, classNames) {
    if (obj[target]) {
        Array.isArray(classNames) ?
            obj[target] = obj[target].concat(classNames)
            :
            obj[target].push(classNames)
    }
}

