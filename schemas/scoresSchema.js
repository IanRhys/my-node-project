const scoresSchema = `
    CREATE TABLE IF NOT EXISTS scores (
        scoreID VARCHAR(255) PRIMARY KEY,
        score SMALLINT NOT NULL
    )
`;

module.exports = scoresSchema;