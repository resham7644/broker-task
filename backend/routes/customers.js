const express = require("express");
const router = express.Router();
const client = require("../db/database");
const bcrypt = require("bcrypt");


router.post("/", async (req, resp) => {
  const { name, email, gstin, type } = req.body;

  // Basic empty field check
  if (!name || !email || !gstin || !type) {
    return resp.status(400).json({ message: "All fields are required." });
  }

  // Email regex validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return resp.status(400).json({ message: "Invalid email format." });
  }

  // GSTIN regex validation (15 characters, alphanumeric)
  const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
  if (!gstRegex.test(gstin)) {
    return resp.status(400).json({ message: "Invalid GSTIN format." });
  }

  try {
    const defaultPassword = gstin + "@123";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const result = await client.query(
      `INSERT INTO customers (name, email, gstin, is_importer, is_exporter, password)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        name,
        email,
        gstin,
        type === "importer",
        type === "exporter",
        hashedPassword,
      ]
    );

    resp.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error message:", err.message);

    if (err.code === "23505") {
      return resp
        .status(409)
        .json({ message: "Email or GSTIN already exists" });
    }

    resp.status(500).json({ message: "Server error" });
  }
});

// GET /api/customers - fetch all registered customers
router.get("/", async (req, res) => {
  try {
    const result = await client.query("SELECT * FROM customers ORDER BY created_at DESC");
    res.json({ status: true, customers: result.rows });
  } catch (err) {
    console.error("Error fetching customers:", err.message);
    res.status(500).json({ message: "Failed to fetch customers" });
  }
});


module.exports = router;