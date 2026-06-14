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

function Register() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
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
        "http://localhost:5000/api/auth/register",
        formData
      );

      // ✅ STORE USER DATA (IMPORTANT)
      const userData = res.data.user || formData;

      localStorage.setItem("user", JSON.stringify({
        name: userData.name,
        email: userData.email,
        phone: userData.phone
      }));

      alert("Registered Successfully ✅");

      // ✅ REDIRECT TO ADMIN PAGE
      navigate("/admin");

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration Failed ❌");
    }
  };

  // 🎨 Input Style
  const inputStyle = {
    mb: 2,

    "& .MuiOutlinedInput-root": {
      color: "white",
      background: "rgba(255,255,255,0.05)",
      backdropFilter: "blur(10px)",

      "& fieldset": {
        borderColor: "rgba(255,255,255,0.5)",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#ff4b2b",
      },
    },

    "& .MuiInputBase-input": {
      color: "white",
    },

    "& input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 100px rgba(255,255,255,0.05) inset !important",
      WebkitTextFillColor: "white !important",
      transition: "background-color 5000s ease-in-out 0s",
    },

    "& input:-webkit-autofill:focus": {
      WebkitBoxShadow: "0 0 0 100px rgba(255,255,255,0.05) inset !important",
      WebkitTextFillColor: "white !important",
    },

    "& .MuiInputLabel-root": {
      color: "rgba(255,255,255,0.7)",
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#ff4b2b",
    },
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
          Join Handify Marketplace 🛒
        </Typography>

        <form onSubmit={handleSubmit}>

          <TextField
            label="Full Name"
            name="name"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
            sx={inputStyle}
          />

          <TextField
            label="Phone Number"
            name="phone"
            fullWidth
            required
            value={formData.phone}
            onChange={handleChange}
            sx={inputStyle}
          />

          <TextField
            label="Email Address"
            name="email"
            type="email"
            fullWidth
            required
            value={formData.email}
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
                  <IconButton
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 1,
              borderRadius: "18px",
              background: "linear-gradient(90deg,#ff416c,#ff4b2b)",
              fontWeight: "bold"
            }}
          >
            SIGN UP
          </Button>

        </form>

        <Typography align="center" sx={{ mt: 3, color: "white" }}>
          Already have an account?
        </Typography>

        <Button
          variant="outlined"
          fullWidth
          onClick={() => navigate("/login")}
          sx={{
            mt: 1,
            borderRadius: "18px",
            color: "white",
            borderColor: "white"
          }}
        >
          Login
        </Button>

      </Paper>

    </div>
  );
}

export default Register;