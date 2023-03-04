export const validatePinNumber = (cardNum: number, pinNum: number) => {
    // TODO : request to bank API
    return cardNum === pinNum;
}
