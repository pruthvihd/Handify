const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ serve images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
const productRoutes = require("./routes/products");
app.use("/api/products", productRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});