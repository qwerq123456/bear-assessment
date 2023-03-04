import { describe, expect, test } from '@jest/globals';
import { validatePinNumber } from './index';

describe('validatePinNumber method test', () => {
    test('return false pinNum is invalid', () => {
        expect(validatePinNumber(1, 2)).toBeFalsy();
    });
    test('return true pinNum is valid', () => {
        expect(validatePinNumber(1, 1)).toBeTruthy();
    });
});