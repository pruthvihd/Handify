import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Typography,
  Paper
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: formData.emailOrPhone,
          password: formData.password
        }
      );

      // 🔥 GET USER FROM BACKEND
      const user = res.data.user || {};

// 🔥 get old stored user
const oldUser = JSON.parse(localStorage.getItem("user")) || {};

// 🔥 FINAL USER FIX (IMPORTANT)
const finalUser = {
  name: user.name || oldUser.name || "User",
  email: user.email || oldUser.email || formData.emailOrPhone,

  // ✅ MAIN FIX HERE
  phone:
    user.phone ||        // from backend
    oldUser.phone ||     // from previous register
    formData.emailOrPhone.match(/^\d+$/) // if user typed phone in login
      ? formData.emailOrPhone
      : ""
};

// ✅ SAVE
localStorage.setItem("user", JSON.stringify(finalUser));

      alert("Login Successful ✅");

      navigate("/admin");

      window.location.reload();

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login Failed ❌");
    }
  };

  // 🎨 YOUR UI (UNCHANGED)
  const inputStyle = {
    mb: 2,
    "& .MuiOutlinedInput-root": {
      color: "white",
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(10px)",
      "& fieldset": { borderColor: "rgba(255,255,255,0.5)" },
      "&:hover fieldset": { borderColor: "white" },
      "&.Mui-focused fieldset": { borderColor: "#ff4b2b" }
    },
    "& .MuiInputBase-input": { color: "white" },
    "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.7)" },
    "& .MuiInputLabel-root.Mui-focused": { color: "#ff4b2b" }
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
          border: "1px solid rgba(255,255,255,0.3)"
        }}
      >

        <Typography
          variant="h5"
          align="center"
          sx={{ fontWeight: "bold", mb: 3, color: "white" }}
        >
          Welcome Back to Handify 🛒
        </Typography>

        <form onSubmit={handleSubmit}>

          <TextField
            label="Email or Phone Number"
            name="emailOrPhone"
            fullWidth
            required
            value={formData.emailOrPhone}
            onChange={handleChange}
            sx={inputStyle}
          />

          <TextField
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            fullWidth
            required
            value={formData.password}
            onChange={handleChange}
            sx={inputStyle}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(prev => !prev)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              borderRadius: "18px",
              background: "linear-gradient(90deg,#ff416c,#ff4b2b)"
            }}
          >
            LOGIN
          </Button>

        </form>

        <Typography
          align="center"
          sx={{ mt: 2, color: "white", cursor: "pointer" }}
          onClick={() => navigate("/forgot-password")}
        >
          Forgot Password?
        </Typography>

        <Typography align="center" sx={{ mt: 3, color: "white" }}>
          Don't have an account?
        </Typography>

        <Button
          variant="outlined"
          fullWidth
          onClick={() => navigate("/register")}
          sx={{
            mt: 1,
            borderRadius: "18px",
            color: "white",
            borderColor: "white"
          }}
        >
          SIGN UP
        </Button>

      </Paper>

    </div>
  );
}

export default Login;