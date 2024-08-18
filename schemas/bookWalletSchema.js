const bookWalletSchema = `
    CREATE TABLE IF NOT EXISTS bookWallets (
        walletID VARCHAR(255) PRIMARY KEY,
        myBook1 VARCHAR(255),
        myBook2 VARCHAR(255),
        myBook3 VARCHAR(255),
        joinedBook1 VARCHAR(255),
        joinedBook2 VARCHAR(255),
        joinedBook3 VARCHAR(255),
        joinedBook4 VARCHAR(255),
        joinedBook5 VARCHAR(255)
    )
`;

module.exports = bookWalletSchema;