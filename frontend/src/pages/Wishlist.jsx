import { useState } from "react";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState(() => {
    return JSON.parse(localStorage.getItem("wishlist")) || [];
  });

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem("wishlist", JSON.stringify(updated));
  };

  return (
    <div className="section">
      <h2>❤️ My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p>No items in wishlist yet.</p>
      ) : (
        wishlist.map((item) => (
          <div key={item.id} className="card">
            <img src={item.image} width="100" />
            <h3>{item.name}</h3>
            <p>₹ {item.price}</p>

            <button onClick={() => removeFromWishlist(item.id)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}