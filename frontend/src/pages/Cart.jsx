import { useState } from "react";
import Navbar from "../components/Navbar";

export default function Cart() {
  // ✅ initialize directly (NO useEffect)
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) || [];
  });

  // ❌ REMOVE ITEM
  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  return (
    <>
      <Navbar />
      <div className="section">
        <h2>Your Cart</h2>

        {cart.length === 0 ? (
          <p>No items added yet</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="card">
              <img src={item.image} width="100" />
              <h3>{item.name}</h3>
              <p>₹ {item.price}</p>

              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))
        )}

        {cart.length > 0 && <button>Checkout</button>}
      </div>
    </>
  );
}