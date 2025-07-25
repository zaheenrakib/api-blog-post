const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET;

// ✅ User Registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Check user already exits
    const exitstingUser = await User.findOne({ where: { email } });

    if (exitstingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    //Hashed Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    res
      .status(200)
      .json({ message: "User create successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //Find User by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Don't Match Email and Password" });
    }

    //Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ message: "Login Successful", token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
