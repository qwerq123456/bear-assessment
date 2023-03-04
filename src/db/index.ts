export interface BankBook {
    bankBookNum: number;
    balance: number;
}

// has to manage with db
export const bankMap = new Map<number, BankBook>([
    [1, { bankBookNum: 1, balance: 1000 }],
    [2, { bankBookNum: 2, balance: 1000 }]
]);
