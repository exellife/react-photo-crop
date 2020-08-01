import { evaluatePosition } from './utils';

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