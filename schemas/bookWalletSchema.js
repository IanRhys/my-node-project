const bookWalletSchema = `
    CREATE TABLE IF NOT EXISTS bookWallets (
        walletID VARCHAR(255) PRIMARY KEY,
        myBook1 VARCHAR(15),
        myBook2 VARCHAR(15),
        myBook3 VARCHAR(15),
        joinedBook1 VARCHAR(15),
        joinedBook2 VARCHAR(15),
        joinedBook3 VARCHAR(15),
        joinedBook4 VARCHAR(15),
        joinedBook5 VARCHAR(15)
    )
`;

module.exports = bookWalletSchema;