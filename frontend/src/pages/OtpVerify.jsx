import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  TextField,
  Button,
  Typography,
  Paper,
  CircularProgress
} from "@mui/material";

function OtpVerify() {
  const navigate = useNavigate();
  const location = useLocation();

  // ✅ get email from ForgotPassword page
  const emailFromState = location.state?.email || "";

  const [email, setEmail] = useState(emailFromState);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset successful ✅");

        // 🔥 redirect to login after success
        setTimeout(() => {
          navigate("/login");
        }, 1500);

      } else {
        setError(data.message || "Something went wrong ❌");
      }

    } catch (err) {
      console.error(err);
      setError("Server error. Please try again ❌");
    }

    setLoading(false);
  };

  return (
    <div className="page">

      <Paper
        elevation={0}
        sx={{
          width: 380,
          padding: 4,
          borderRadius: "40px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 10px 35px rgba(0,0,0,0.35)",
          transition: "all 0.35s ease",

          "&:hover": {
            transform: "translateY(-6px) scale(1.02)",
            boxShadow: `
              0 0 15px rgba(255,255,255,0.6),
              0 0 35px rgba(255,255,255,0.35),
              0 0 60px rgba(255,255,255,0.2)
            `
          }
        }}
      >

        <Typography
          variant="h5"
          align="center"
          sx={{ fontWeight: "bold", mb: 3, color: "white" }}
        >
          Verify OTP 🔐
        </Typography>

        <Typography
          align="center"
          sx={{ mb: 3, color: "white", fontSize: "14px" }}
        >
          Enter OTP and new password
        </Typography>

        <form onSubmit={handleSubmit}>

          <TextField
            label="Email"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="OTP"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />

          <TextField
            label="New Password"
            type="password"
            fullWidth
            required
            sx={{ mb: 2 }}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* SUCCESS */}
          {message && (
            <Typography
              sx={{
                color: "lightgreen",
                mb: 1,
                textAlign: "center",
                fontSize: "14px"
              }}
            >
              {message}
            </Typography>
          )}

          {/* ERROR */}
          {error && (
            <Typography
              sx={{
                color: "red",
                mb: 1,
                textAlign: "center",
                fontSize: "14px"
              }}
            >
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{
              mt: 1,
              borderRadius: "18px",
              background: "linear-gradient(90deg,#ff416c,#ff4b2b)",
              fontWeight: "bold",
              height: "45px"
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "VERIFY & RESET"}
          </Button>

        </form>

        <Typography
          align="center"
          sx={{
            mt: 3,
            color: "white",
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" }
          }}
          onClick={() => navigate("/login")}
        >
          Back to Login
        </Typography>

      </Paper>

    </div>
  );
}

export default OtpVerify;