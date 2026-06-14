import { useNavigate } from "react-router-dom";

export default function Admin() {
  const navigate = useNavigate();

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    user = null;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="section">
      <h2>👤 My Profile</h2>

      {user ? (
        <>
          <p><strong>Full Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Phone:</strong> {user.phone}</p>

          <button onClick={() => navigate("/wishlist")}>
            ❤️ Wishlist
          </button>

          <br /><br />

          <button onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <p>Please login or register</p>

          <button onClick={() => navigate("/login")}>
            Login
          </button>

          <button onClick={() => navigate("/register")}>
            Register
          </button>
        </>
      )}
    </div>
  );
}