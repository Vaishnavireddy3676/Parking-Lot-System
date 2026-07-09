const express = require("express");

const router = express.Router();

const {
    getSlots,
    parkVehicle,
    exitVehicle,
    getParkedVehicles
} = require("../controllers/parkingController");

router.get("/slots", getSlots);

router.post("/park", parkVehicle);

router.post("/exit", exitVehicle);

router.get("/parked", getParkedVehicles);
router.get("/test", (req, res) => {
    res.json({ message: "Parking Routes Working" });
});

module.exports = router;