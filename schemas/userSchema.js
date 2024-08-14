const userSchema = `
  CREATE TABLE IF NOT EXISTS users (
      username VARCHAR(255) PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      bookWallet VARCHAR(255) NOT NULL
  )
`;

module.exports = userSchema;