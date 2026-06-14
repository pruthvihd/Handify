import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  // 🔥 Fetch latest products from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products/latest")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <div>
      <Navbar />

      {/* 🔥 HERO */}
      <Hero />

      {/* 🛍️ FEATURED PRODUCTS */}
      <div className="section">
        <h2>Featured Handmade Creations</h2>

        <div className="cards">
          {products.length > 0 ? (
            products.map((item) => (
              <ProductCard
                key={item.id}
                product={{
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  image: `http://localhost:5000${item.image_url}`
                }}
              />
            ))
          ) : (
            <p>No products available</p>
          )}
        </div>

        <br />
        <button onClick={() => navigate("/products")}>
          View All Products
        </button>
      </div>

      {/* 🎨 ARTISTS SECTION */}
      <div className="section">
        <h2>Meet Our Artists</h2>
        <p>Discover talented creators behind every craft</p>

        <button onClick={() => navigate("/artists")}>
          Explore Artists
        </button>
      </div>

      {/* 📩 CUSTOM REQUEST SECTION */}
      <div className="section">
        <h2>Looking for Something Unique?</h2>
        <p>Request custom handmade products</p>

        <button onClick={() => navigate("/requests")}>
          Request a Product
        </button>
      </div>

      {/* 🧵 SELL SECTION */}
      <div className="section">
        <h2>Are You an Artisan?</h2>
        <p>Start selling your handmade creations</p>

        <button onClick={() => navigate("/sell")}>
          Sell Your Craft
        </button>
      </div>

      {/* 🔚 FOOTER */}
      <Footer />
    </div>
  );
}