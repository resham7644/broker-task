const express = require("express");
const router = express.Router();
const client = require("../db/database");
const bcrypt = require("bcrypt");

router.post("/",async(req,resp)=>{
    const { name, email, gstin, type } = req.body;
    
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
    }
    catch(err){
        console.error("Error message:", err.message);
    
        if (err.code === '23505') {
            // 23505 = PostgreSQL unique violation error code
            return resp.status(409).json({ message: "Email or GSTIN already exists" });
        }
        
        resp.status(500).json({ message: "Server error" });
    }
})

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