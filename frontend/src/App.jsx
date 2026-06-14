import { Routes, Route } from "react-router-dom";
import "./App.css";

// 🌐 Pages
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Artists from "./pages/Artists";
import Sell from "./pages/Sell";
import Requests from "./pages/Requests";
import Cart from "./pages/Cart";

// 👤 NEW (Admin + Wishlist)
import Admin from "./pages/Admin";
import Wishlist from "./pages/Wishlist"; 

// 🔐 Auth
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import OtpVerify from "./pages/OtpVerify";

function App() {
  return (
    <Routes>
      {/* 🌐 MAIN */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/product/:id" element={<ProductDetails />} />

      <Route path="/artists" element={<Artists />} />
      <Route path="/sell" element={<Sell />} />
      <Route path="/requests" element={<Requests />} />
      <Route path="/cart" element={<Cart />} />

      {/* 👤 ADMIN / PROFILE */}
      <Route path="/admin" element={<Admin />} />
      <Route path="/wishlist" element={<Wishlist />} />

      {/* 🔐 AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/verify-otp" element={<OtpVerify />} />

      {/* ❌ 404 */}
      <Route path="*" element={<h2>404 | Page Not Found 😢</h2>} />
    </Routes>
  );
}

export default App;