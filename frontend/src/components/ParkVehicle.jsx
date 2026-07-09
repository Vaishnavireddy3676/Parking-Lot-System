import { useState } from "react";
import api from "../services/api";

function ParkVehicle({ refreshSlots, setTicket }) {

    const [vehicleNumber, setVehicleNumber] = useState("");
    const [vehicleType, setVehicleType] = useState("car");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setLoading(true);
        setMessage("");

        try {
    const res = await api.post("/park", {
        vehicleNumber,
        vehicleType
    });

    setTicket(res.data.ticket);
    setMessage("Ticket Generated Successfully");
    setVehicleNumber("");
    setVehicleType("car");
    refreshSlots();

} catch (error) {
    console.error(error);

    setMessage(
        error.response?.data?.message ||
        error.message ||
        "Server Error"
    );
} finally {
    setLoading(false);
}
    };

    return (

        <div className="form-card">

            <h2>Park a vehicle</h2>

            <p className="subtitle">
                Generates a ticket
            </p>

            <form onSubmit={handleSubmit}>

                <label>Vehicle number</label>

                <input
                    value={vehicleNumber}
                    onChange={(e)=>setVehicleNumber(e.target.value)}
                    placeholder="KA01AB1234"
                    required
                />

                <label>Vehicle type</label>

                <select
                    value={vehicleType}
                    onChange={(e)=>setVehicleType(e.target.value)}
                >
                    <option value="bike">Bike</option>
                    <option value="car">Car</option>
                    <option value="truck">Truck</option>
                </select>

                <button disabled={loading}>
                    {loading ? "Generating..." : "Generate ticket"}
                </button>

            </form>

            {message &&

                <p
                style={{
                    color:message.includes("Successfully")?"green":"red",
                    marginTop:15,
                    fontWeight:600
                }}
                >
                    {message}
                </p>

            }

        </div>

    );

}

export default ParkVehicle;