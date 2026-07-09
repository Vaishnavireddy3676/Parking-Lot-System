const express = require("express");
const cors = require("cors");
require("dotenv").config();

const pool = require("./db");
const parkingRoutes = require("./routes/parkingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", parkingRoutes);

app.get("/", async(req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");
        res.json({
            message: "Database Connected Successfully",
            time: result.rows[0].now
        });
    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: err.message
        });
    }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});