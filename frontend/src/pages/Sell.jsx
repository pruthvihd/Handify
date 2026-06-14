import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const categories = [
  "Handmade Jewelry",
  "Bags & Accessories",
  "Home Decor",
  "Wood Crafts",
  "Paintings & Art",
  "Candles",
  "Clothing & Textile",
  "Pottery & Clay",
  "Embroidery & Knitting",
  "Paper Crafts",
  "Personalized Gifts",
  "Eco-Friendly Products",
  "Other"
];

function Sell() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    materials: "",
    category: ""
  });

  const [images, setImages] = useState([]);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ IMAGE SELECT
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + images.length > 5) {
      alert("Maximum 5 images allowed ❌");
      return;
    }

    setImages([...images, ...files]);
  };

  // ❌ REMOVE IMAGE
  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
  };

  // ✅ SUBMIT (FIXED)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert("Upload at least 1 image ❌");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("price", Number(form.price));
      formData.append("description", form.description);
      formData.append("materials", form.materials);
      formData.append("category", form.category);

      images.forEach((img) => {
        formData.append("images", img);
      });

      const res = await axios.post(
        "http://localhost:5000/api/products/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      console.log("SUCCESS:", res.data);

      alert("Product Added Successfully ✅");
      navigate("/");

    } catch (err) {
      console.error("ERROR:", err.response?.data || err.message);
      alert("Error adding product ❌");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Sell Your Product</h2>

      {/* ✅ IMPORTANT: onSubmit is here */}
      <form onSubmit={handleSubmit}>
        
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          required
          style={inputStyle}
        >
          <option value="">Select Category</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat}>{cat}</option>
          ))}
        </select>

        <input
          name="materials"
          placeholder="Materials"
          value={form.materials}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        {/* IMAGE UPLOAD */}
        <label style={uploadBtn}>
          Choose Images
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            hidden
          />
        </label>

        <p>{images.length}/5 selected</p>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {images.map((img, index) => (
            <div key={index} style={{ position: "relative" }}>
              <img
                src={URL.createObjectURL(img)}
                alt=""
                width="80"
                height="80"
              />
              <span
                onClick={() => removeImage(index)}
                style={removeBtn}
              >
                ✕
              </span>
            </div>
          ))}
        </div>

        <button type="submit" style={submitBtn}>
          Submit Product ✅
        </button>
      </form>
    </div>
  );
}

export default Sell;

// STYLES
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px"
};

const uploadBtn = {
  display: "inline-block",
  padding: "8px",
  background: "#333",
  color: "white",
  cursor: "pointer",
  marginBottom: "10px"
};

const submitBtn = {
  width: "100%",
  padding: "10px",
  background: "green",
  color: "white",
  border: "none"
};

const removeBtn = {
  position: "absolute",
  top: "-5px",
  right: "-5px",
  background: "red",
  color: "white",
  borderRadius: "50%",
  cursor: "pointer",
  padding: "2px 6px",
  fontSize: "12px"
};