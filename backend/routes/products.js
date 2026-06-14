const express = require("express");
const router = express.Router();
const pool = require("../config/db");
const multer = require("multer");

// ✅ Multer setup
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ✅ Convert to full URL
const formatProducts = (rows) => {
  return rows.map((product) => ({
    ...product,
    image_urls: product.image_urls
      ? product.image_urls.map(
          (img) => `http://localhost:5000${img}`
        )
      : [],
  }));
};

// ✅ GET ALL
router.get("/latest", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM products ORDER BY id DESC LIMIT 5"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).send("Error");
  }
});

// ✅ ADD PRODUCT
router.post("/add", upload.array("images", 5), async (req, res) => {
  try {
    const { name, price, description, materials, category } = req.body;

    const image_urls = req.files
      ? req.files.map((file) => `/uploads/${file.filename}`)
      : [];

    const result = await pool.query(
      `INSERT INTO products 
      (name, price, description, materials, category, image_urls) 
      VALUES ($1,$2,$3,$4,$5,$6) 
      RETURNING *`,
      [name, price, description, materials, category, image_urls]
    );

    res.json(formatProducts(result.rows)[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding product");
  }
});

module.exports = router;