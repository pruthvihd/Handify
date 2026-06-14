import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function ProductDetails() {
  const { id } = useParams();

  return (
    <>
      <Navbar />
      <div className="section">
        <h2>Product #{id}</h2>
        <p>Beautiful handmade product details here...</p>

        <button>Add to Cart</button>
      </div>
    </>
  );
}