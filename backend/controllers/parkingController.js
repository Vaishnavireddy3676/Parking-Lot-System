const pool = require("../db");
const LIMITS = require("../utils/constants");
const calculateFare = require("../utils/fareCalculator");

// ======================
// GET /api/slots
// ======================
const getSlots = async(req, res) => {
    try {

        const bikeResult = await pool.query(
            "SELECT COUNT(*) FROM tickets WHERE vehicle_type='bike' AND status='parked'"
        );

        const carResult = await pool.query(
            "SELECT COUNT(*) FROM tickets WHERE vehicle_type='car' AND status='parked'"
        );

        const truckResult = await pool.query(
            "SELECT COUNT(*) FROM tickets WHERE vehicle_type='truck' AND status='parked'"
        );

        const bikeOccupied = parseInt(bikeResult.rows[0].count);
        const carOccupied = parseInt(carResult.rows[0].count);
        const truckOccupied = parseInt(truckResult.rows[0].count);

        res.json({
            bike: {
                total: LIMITS.bike,
                available: LIMITS.bike - bikeOccupied
            },
            car: {
                total: LIMITS.car,
                available: LIMITS.car - carOccupied
            },
            truck: {
                total: LIMITS.truck,
                available: LIMITS.truck - truckOccupied
            }
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
            detail: error.detail,
            code: error.code
        });

    }
};

// ======================
// POST /api/park
// ======================
const parkVehicle = async(req, res) => {

    try {

        const { vehicleNumber, vehicleType } = req.body;

        if (!vehicleNumber || !vehicleType) {
            return res.status(400).json({
                success: false,
                message: "Vehicle number and vehicle type are required"
            });
        }

        const type = vehicleType.toLowerCase();

        if (!LIMITS[type]) {
            return res.status(400).json({
                success: false,
                message: "Invalid vehicle type"
            });
        }

        const existingVehicle = await pool.query(
            `SELECT * FROM tickets
             WHERE vehicle_number=$1
             AND status='parked'`, [vehicleNumber]
        );

        if (existingVehicle.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Vehicle is already parked"
            });
        }

        const occupiedResult = await pool.query(
            `SELECT COUNT(*) FROM tickets
             WHERE vehicle_type=$1
             AND status='parked'`, [type]
        );

        const occupied = parseInt(occupiedResult.rows[0].count);

        if (occupied >= LIMITS[type]) {
            return res.status(409).json({
                success: false,
                message: "Parking Full"
            });
        }

        const countResult = await pool.query(
            "SELECT COUNT(*) FROM tickets"
        );

        const ticketNo = parseInt(countResult.rows[0].count) + 1001;

        const ticketId = `TKT-${ticketNo}`;

        const entryTime = new Date();

        await pool.query(
            `INSERT INTO tickets
            (ticket_id, vehicle_number, vehicle_type, entry_time)
            VALUES ($1,$2,$3,$4)`, [ticketId, vehicleNumber, type, entryTime]
        );

        res.status(201).json({
            success: true,
            ticket: {
                ticketId,
                vehicleNumber,
                vehicleType: type,
                entryTime
            }
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

// ======================
// POST /api/exit
// ======================
const exitVehicle = async(req, res) => {

    try {

        const { ticketId, vehicleNumber } = req.body;

        if (!ticketId && !vehicleNumber) {

            return res.status(400).json({
                success: false,
                message: "Ticket ID or Vehicle Number is required"
            });

        }

        let result;

        if (ticketId) {

            result = await pool.query(
                `SELECT * FROM tickets
                 WHERE ticket_id=$1
                 AND status='parked'`, [ticketId]
            );

        } else {

            result = await pool.query(
                `SELECT * FROM tickets
                 WHERE vehicle_number=$1
                 AND status='parked'`, [vehicleNumber]
            );

        }

        if (result.rows.length === 0) {

            return res.status(404).json({
                success: false,
                message: "Ticket not found or already exited"
            });

        }

        const ticket = result.rows[0];

        const exitTime = new Date();

        const fare = calculateFare(ticket.entry_time, exitTime);

        await pool.query(
            `UPDATE tickets
             SET exit_time=$1,
                 amount=$2,
                 status='exited'
             WHERE id=$3`, [exitTime, fare.amount, ticket.id]
        );

        res.json({

            success: true,

            receipt: {

                ticketId: ticket.ticket_id,

                vehicleNumber: ticket.vehicle_number,

                entryTime: ticket.entry_time,

                exitTime,

                durationHours: fare.durationHours,

                amount: fare.amount

            }

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: "Server Error"

        });

    }

};

// ======================
// GET /api/parked
// ======================
const getParkedVehicles = async(req, res) => {

    try {

        const result = await pool.query(
            `SELECT
                ticket_id,
                vehicle_number,
                vehicle_type,
                entry_time
             FROM tickets
             WHERE status='parked'
             ORDER BY entry_time ASC`
        );

        const vehicles = result.rows.map(vehicle => ({
            ticketId: vehicle.ticket_id,
            vehicleNumber: vehicle.vehicle_number,
            vehicleType: vehicle.vehicle_type,
            entryTime: vehicle.entry_time
        }));

        res.json(vehicles);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

module.exports = {
    getSlots,
    parkVehicle,
    exitVehicle,
    getParkedVehicles
};