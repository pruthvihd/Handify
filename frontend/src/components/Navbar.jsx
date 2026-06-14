import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  return (
    <nav className="navbar">

      <h2 className="logo" onClick={() => navigate("/")}>
        Handify
      </h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Discover</Link>
        <Link to="/artists">Artists</Link>
        <Link to="/requests">Requests</Link>
      </div>

      <div className="nav-right">
        <button onClick={() => navigate("/cart")}>🛒</button>

        <button onClick={() => navigate("/admin")}>
          {user ? `👤 ${user.name}` : "👤"}
        </button>
      </div>

    </nav>
  );
}