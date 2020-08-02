import { evaluatePosition, addToArray } from './utils';

function randomDigit(n) {
    return Math.floor(Math.random() * Math.floor(n))
}

function generateRandomTests(m) {
    const tests = []
    for (let i = 0; i < 1000; i++) {
        const [x, y, z]
            = [randomDigit(m), randomDigit(m), randomDigit(m)]

        const input = `transform3d(${x}%, ${y}%, ${z}%)`;
        tests.push([input, [x, y, z]]);
    }

    return tests;
}

describe('Evaluate Position Function', () => {

    test('testing positive numbers', () => {
        const tests = generateRandomTests(101)
        for (const test of tests) {
            expect(evaluatePosition(test[0]))
                .toStrictEqual(test[1])
        }
    });


    test('testing negative numbers', () => {
        const tests = generateRandomTests(-101);
        for (const test of tests) {
            expect(evaluatePosition(test[0]))
                .toStrictEqual(test[1])
        }
    })
})

function generateRandomInputClassNames() {

    if (randomDigit(2)) {
        return Math.random().toString(15)
    } else {
        return new Array(randomDigit(10)).fill(Math.random().toString(15))
    }
}

describe('Add classNames to object with array values', () => {
    test('random input test', () => {
        const objOriginal = {
            modal: ['rpc-modal'],
            window: ['rpc-window'],
            cropOut: ['rpc-crop-out'],
            crop: ['rpc-crop'],
            cropIn: ['rpc-crop-in'],
            photoCrop: ['rpc-photo-crop'],
            img: ['rpc-img'],
            after: ['rpc-after'],
            modalBtn: ['rpc-btn'],
            rangeWrap: ['rpc-range-wrap'],
            rangeVal: ['rpc-range-val'],
            cancelBtn: ['rpc-cancel-btn'],
            actionBtn: ['rpc-action-btn'],
            inputFileBtn: ['rpc-input-file'],
        };

        let objToTest = {
            modal: ['rpc-modal'],
            window: ['rpc-window'],
            cropOut: ['rpc-crop-out'],
            crop: ['rpc-crop'],
            cropIn: ['rpc-crop-in'],
            photoCrop: ['rpc-photo-crop'],
            img: ['rpc-img'],
            after: ['rpc-after'],
            modalBtn: ['rpc-btn'],
            rangeWrap: ['rpc-range-wrap'],
            rangeVal: ['rpc-range-val'],
            cancelBtn: ['rpc-cancel-btn'],
            actionBtn: ['rpc-action-btn'],
            inputFileBtn: ['rpc-input-file'],
        };
        for (let k in objToTest) {
            for (let i = 0; i < 10; i++) {
                const input = generateRandomInputClassNames();
                const testArray = objToTest[k];
                if (Array.isArray(input)) {
                    testArray = [...testArray, ...input]
                } else {
                    testArray.push(input);
                }
                addToArray(objToTest, k, input);
                expect(objToTest[k]).toStrictEqual(testArray);
            }

        }
    })
})