import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="hero">
      <h1>Handcrafted with Love</h1>
      <p>Where tradition meets creativity</p>

      <div className="hero-buttons">
        <button onClick={() => navigate("/products")}>
          Shop Now
        </button>

        <button onClick={() => navigate("/sell")}>
          Sell Your Craft
        </button>

        <button onClick={() => navigate("/artists")}>
          Explore Artists
        </button>
      </div>
    </div>
  );
}