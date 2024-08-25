const picksSchema = `
    CREATE TABLE IF NOT EXISTS picks (
        pickID VARCHAR(255) PRIMARY KEY,
        pick TINYINT NOT NULL
    )
`;

module.exports = picksSchema;