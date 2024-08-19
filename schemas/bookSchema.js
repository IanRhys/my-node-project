const bookSchema = `
    CREATE TABLE IF NOT EXISTS books (
        bookID VARCHAR(255) PRIMARY KEY,
        bookName VARCHAR(15) NOT NULL,
        owner VARCHAR(255) NOT NULL
    )
`;

module.exports = bookSchema;