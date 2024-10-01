const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const bookWalletSchema = require("../schemas/bookWalletSchema");
const bcrypt = require("bcryptjs");
const {
  createTable,
  checkRecordExists,
  insertRecord
} = require("../utils/sqlFunctions");


const generateAccessToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "24h" });
};

const register = async (req, res) => {
  const { email, username, password } = req.body;
  if (!email || !username || !password) {
    res
      .status(400)
      .json({ error: "Email, Username, or Password fields cannot be empty!" });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = {
    username: username,
    email,
    password: hashedPassword
  };
  const bookWallet = {
    email: email
  }
  try {
    await createTable(userSchema);
    await createTable(bookWalletSchema);
    const userAlreadyExists = await checkRecordExists("users", "email", email);
    if (userAlreadyExists) {
      res.status(409).json({ error: "Email already exists" });
    } else {
      await insertRecord("users", user);
      await insertRecord("bookWallets", bookWallet);
      res.status(201).json({ message: "User created successfully!" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ error: "Email or Password fields cannot be empty!" });
    return;
  }

  try {
    const existingUser = await checkRecordExists("users", "email", email);

    if (existingUser) {
      if (!existingUser.password) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (passwordMatch) {
        res.status(200).json({
          username: existingUser.username,
          email: existingUser.email,
          access_token: generateAccessToken(existingUser.email)
        });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  login,
};