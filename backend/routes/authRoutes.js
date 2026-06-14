const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/authController");

const pool = require("../config/db");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// =========================
// ✅ REGISTER
// =========================
router.post("/register", registerUser);

// =========================
// ✅ LOGIN
// =========================
router.post("/login", loginUser);

// =========================
// ✅ FORGOT PASSWORD (OTP + EMAIL)
// =========================
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    // 🔢 Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // ⏳ Expiry (5 min)
    const expiry = Date.now() + 5 * 60 * 1000;

    // 💾 Save OTP
    await pool.query(
      "UPDATE users SET otp=$1, otp_expiry=$2 WHERE email=$3",
      [otp, expiry, email]
    );

    // =========================
    // 📧 SEND EMAIL (FIXED)
    // =========================
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP for Password Reset",
      html: `
        <h2>Password Reset OTP</h2>
        <p>Your OTP is:</p>
        <h1 style="color:#ff416c">${otp}</h1>
        <p>This OTP is valid for 5 minutes.</p>
      `,
    });

    console.log("OTP sent to email:", otp);

    res.json({
      message: "OTP sent to email ✅",
    });

  } catch (err) {
    console.error("Forgot Password Error:", err);
    res.status(500).json({ message: "Email not sent ❌" });
  }
});

// =========================
// ✅ VERIFY OTP + RESET PASSWORD
// =========================
router.post("/verify-otp", async (req, res) => {
  const { email, otp, password } = req.body;

  try {
    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(400).json({ message: "User not found ❌" });
    }

    const dbUser = user.rows[0];

    if (dbUser.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP ❌" });
    }

    if (Date.now() > dbUser.otp_expiry) {
      return res.status(400).json({ message: "OTP expired ⏳" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      "UPDATE users SET password=$1, otp=NULL, otp_expiry=NULL WHERE email=$2",
      [hashedPassword, email]
    );

    res.json({ message: "Password reset successful ✅" });

  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;