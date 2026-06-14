import { useState } from "react";


function ProductCard({ product }) {
  const [currentImg, setCurrentImg] = useState(0);

  const images =
    product.image_urls?.length > 0
      ? product.image_urls
      : ["https://dummyimage.com/300x200/ccc/000&text=No+Image"];

  return (
    <div>
      <img
        src={images[currentImg]}
        alt={product.name}
        style={{ width: "100%", height: "200px" }}
      />

      {images.length > 1 && (
        <button onClick={() => setCurrentImg((prev) => (prev + 1) % images.length)}>
          Next
        </button>
      )}

      <h3>{product.name}</h3>
      <p>₹ {product.price}</p>
    </div>
  );
}

export default ProductCard;