import { describe, expect, jest, test } from '@jest/globals';
import { insertCard, checkPinNumber, selectAccount, getBalance, deposit, widthdraw } from './atm';

import * as util from '../util';
import { bankMap } from 'db';

jest.mock("../util/index.ts");

const TestCard1 = { cardNum: 1 };
const TestCard2 = { cardNum: 2 };

const TestBankBook1 = { bankBookNum: 1, balance: 1000 };
const TestBankBook2 = { bankBookNum: 2, balance: 1000 };

const TestInvalidCard = { cardNum: 3 };

const TestInvalidBankBookNum = 3;

describe('insertCard method test', () => {
    test('insertCard just returns true', () => {
        expect(insertCard()).toBeTruthy();
    });
});

describe('checkPinNumber test', () => {
    test('with valid pin number', () => {
        checkPinNumber(TestCard1, 1);
        expect(util.validatePinNumber).toBeCalledWith(TestCard1.cardNum, 1);
    });

    test('with invalid pin number', () => {
        checkPinNumber(TestCard2, 3);
        expect(util.validatePinNumber).toBeCalledWith(TestCard2.cardNum, 3);
    });
})

describe('selectAccount test', () => {
    test('with existing account', () => {
        expect(selectAccount(TestCard1)).toBe(TestBankBook1.bankBookNum);
    });

    test('with not existing account', () => {
        expect(selectAccount(TestInvalidCard)).toBe("ERROR");
    });
})

describe('getBalance test', () => {
    test('with TestBankBook1', () => {
        expect(getBalance(TestBankBook1.bankBookNum)).toBe(TestBankBook1.balance);
    });

    test("with not existing account", () => {
        expect(getBalance(TestInvalidBankBookNum)).toBe("ERROR");
    })
})

describe('deposit test', () => {
    test('deposit 1000 dollor', () => {
        const initialBankBook = bankMap.get(TestBankBook1.bankBookNum);
        expect(initialBankBook?.balance).toBe(1000);

        deposit(TestBankBook1.bankBookNum, 1000);

        const afterDepositBankBook = bankMap.get(TestBankBook1.bankBookNum);
        expect(afterDepositBankBook?.balance).toBe(2000);
    });
    test('with not existing account', () => {
        expect(deposit(TestInvalidBankBookNum, 1000)).toBe("ERROR");
    })
})

describe('widthdraw test', () => {
    test('widthdraw not enough money', () => {
        expect(widthdraw(TestBankBook2.bankBookNum, 2000)).toBe("fail");
        const bankBook = bankMap.get(TestBankBook2.bankBookNum);

        expect(bankBook?.balance).toBe(1000);
    });

    test('with not exisiting account', () => {
        expect(widthdraw(TestInvalidBankBookNum, 2000)).toBe("ERROR");
    });

    test('widthdraw 500 dollor', () => {
        const initialBankBook = bankMap.get(TestBankBook2.bankBookNum);
        expect(initialBankBook?.balance).toBe(1000);

        widthdraw(TestBankBook2.bankBookNum, 500);

        const afterDepositBankBook = bankMap.get(TestBankBook2.bankBookNum);
        expect(afterDepositBankBook?.balance).toBe(500);
    })
})