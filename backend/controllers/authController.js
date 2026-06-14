const pool = require("../config/db");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");


// ==========================
// ✅ REGISTER (FIXED)
// ==========================
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // 🔍 Check existing user
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔐 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ INSERT WITH PHONE
    const newUser = await pool.query(
      "INSERT INTO users (name, email, password, phone) VALUES ($1,$2,$3,$4) RETURNING id, name, email, phone",
      [name, email, hashedPassword, phone]
    );

    res.status(201).json({
      message: "User Registered Successfully ✅",
      user: newUser.rows[0]   // ✅ send user back
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


// ==========================
// ✅ LOGIN (FIXED)
// ==========================
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.rows[0].password
    );

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password ❌" });
    }

    // ✅ RETURN FULL USER INCLUDING PHONE
    res.status(200).json({
      message: "Login successful ✅",
      user: {
        id: user.rows[0].id,
        name: user.rows[0].name,
        email: user.rows[0].email,
        phone: user.rows[0].phone   // 🔥 FIXED
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};


// ==========================
// ✅ FORGOT PASSWORD
// ==========================
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    const token = Math.random().toString(36).substring(2);

    await pool.query(
      "UPDATE users SET reset_token=$1 WHERE email=$2",
      [token, email]
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset",
      html: `
        <h3>Password Reset Request</h3>
        <p>Click below link to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
      `,
    });

    res.json({ message: "Reset link sent successfully ✅" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Email not sent ❌" });
  }
};


// ==========================
// ✅ RESET PASSWORD
// ==========================
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await pool.query(
      "SELECT * FROM users WHERE reset_token=$1",
      [token]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired token ❌" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "UPDATE users SET password=$1, reset_token=NULL WHERE reset_token=$2",
      [hashedPassword, token]
    );

    res.json({ message: "Password reset successful ✅" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error resetting password ❌" });
  }
};