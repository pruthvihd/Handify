import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Paper
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

function ResetPassword() {

  const navigate = useNavigate();
  const { token } = useParams(); // ✅ get token from URL

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReset = async () => {

    setError("");
    setSuccess("");

    if (!password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Password reset successful!");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setError(data.message || "Something went wrong");
      }

    } catch (err) {
      console.error(err);
      setError("Server error");
    }
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
        }}
      >

        <Typography
          variant="h5"
          align="center"
          sx={{ fontWeight: "bold", mb: 3, color: "white" }}
        >
          Reset Password 🔐
        </Typography>

        <TextField
          label="New Password"
          type={showPassword ? "text" : "password"}
          fullWidth
          sx={{ mb: 2 }}
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={()=>setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <TextField
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          fullWidth
          sx={{ mb: 2 }}
          value={confirmPassword}
          onChange={(e)=>setConfirmPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={()=>setShowConfirmPassword(!showConfirmPassword)}>
                  {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        {/* ❌ Error */}
        {error && (
          <Typography sx={{ color: "red", mb: 1, textAlign: "center" }}>
            {error}
          </Typography>
        )}

        {/* ✅ Success */}
        {success && (
          <Typography sx={{ color: "lightgreen", mb: 1, textAlign: "center" }}>
            {success}
          </Typography>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={handleReset}
          sx={{
            mt: 1,
            borderRadius: "18px",
            background: "linear-gradient(90deg,#ff416c,#ff4b2b)",
            fontWeight: "bold"
          }}
        >
          RESET PASSWORD
        </Button>

      </Paper>

    </div>
  );
}

export default ResetPassword;