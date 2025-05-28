const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const customerRoutes = require("./routes/customers");
app.use("/api/customers", customerRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running`);
});