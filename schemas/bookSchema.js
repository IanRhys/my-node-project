const bookSchema = `
    CREATE TABLE IF NOT EXISTS books (
        bookID VARCHAR(255) PRIMARY KEY,
        bookName VARCHAR(15) NOT NULL
    )
`;

module.exports = bookSchema;