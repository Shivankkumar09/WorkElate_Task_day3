const express = require("express");
const cors = require("cors");
const  responseRoutes = require("./routes/formRoute.js");
const connectDB = require("./db/db.js");

require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/response", responseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));