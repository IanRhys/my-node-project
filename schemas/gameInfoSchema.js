const gameInfoSchema = `
    CREATE TABLE IF NOT EXISTS gameInfos (
        gameInfoID VARCHAR(255) PRIMARY KEY,
        matchup VARCHAR(255) NOT NULL,
        favorite VARCHAR(255) NOT NULL,
        underdog VARCHAR(255) NOT NULL,
        line VARCHAR(255) NOT NULL,
        score VARCHAR(255) NOT NULL
    )
`;

module.exports = gameInfoSchema;