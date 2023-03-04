import { bankMap } from "db";
import { validatePinNumber } from "../util";

interface Card {
    cardNum: number;
}

export const insertCard = () => {
    return true;
}

export const checkPinNumber = (card: Card, pinNum: number) => {
    const { cardNum } = card;
    return validatePinNumber(cardNum, pinNum);
}

export const selectAccount = (card: Card) => {
    const bankBook = bankMap.get(card.cardNum);
    if (!bankBook) {
        // TODO : has to handle ERROR
        return "ERROR"
    }
    return bankBook.bankBookNum;
}

export const getBalance = (bookNum: number) => {
    const bankBook = bankMap.get(bookNum);
    if (!bankBook) return "ERROR";
    return bankBook.balance;
}

export const deposit = (bookNum: number, money: number) => {
    const bankBook = bankMap.get(bookNum);
    if (!bankBook) return "ERROR";
    const { bankBookNum, balance } = bankBook;

    bankBook.balance = balance + money;
    bankMap.set(bankBookNum, bankBook);

    // TODO : handle response
    return "SUCCESS";
}

export const widthdraw = (bookNum: number, money: number,) => {
    const bankBook = bankMap.get(bookNum);
    if (!bankBook) return "ERROR";
    const { bankBookNum, balance } = bankBook;
    if (balance < money) {
        // TODO : handle error
        return "FAIL"
    }
    bankBook.balance = balance - money;
    bankMap.set(bankBookNum, bankBook);

    // TODO : handle response
    return "SUCCESS";
}