const membersSchema = `
    CREATE TABLE IF NOT EXISTS members (
        bookID VARCHAR(255) PRIMARY KEY,
        member1 VARCHAR(255) NOT NULL,
        member2 VARCHAR(255),
        member3 VARCHAR(255),
        member4 VARCHAR(255),
        member5 VARCHAR(255),
        member6 VARCHAR(255),
        member7 VARCHAR(255),
        member8 VARCHAR(255),
        member9 VARCHAR(255),
        member10 VARCHAR(255)
    )
`;

module.exports = membersSchema;