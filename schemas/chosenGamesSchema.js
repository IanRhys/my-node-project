const chosenGamesSchema = `
    CREATE TABLE IF NOT EXISTS games (
        gamesID VARCHAR(255) PRIMARY KEY,
        game1 INT,
        game2 INT,
        game3 INT,
        game4 INT,
        game5 INT,
        game6 INT,
        game7 INT,
        game8 INT,
        game9 INT,
        game10 INT,
        game11 INT,
        game12 INT,
        game13 INT,
        game14 INT,
        game15 INT
    )
`;

module.exports = chosenGamesSchema;