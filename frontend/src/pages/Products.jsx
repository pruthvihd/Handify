import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Products() {
  const [products, setProducts] = useState([]);

  // 🔥 Fetch ALL products from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        console.log(res.data); // 👈 check data in console
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  return (
    <>
      <Navbar />

      <div className="section">
        <h2>All Handmade Products</h2>

        <div className="cards">
          {products.length === 0 ? (
            <p>No products added</p>
          ) : (
            products.map((p) => (
              <ProductCard
                key={p.id}
                product={{
                  id: p.id,
                  name: p.name,
                  price: p.price,
                  description: p.description,
                  // ✅ FIXED IMAGE LOGIC
                  image: p.image_urls?.[0]
                    ? `http://localhost:5000${p.image_urls[0]}`
                    : "https://dummyimage.com/300x200/ccc/000&text=No+Image"
                }}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}