import { useEffect, useState } from "react";
import api from "../services/api";

function ParkedVehicles({ refresh }) {

    const [vehicles, setVehicles] = useState([]);

    const fetchVehicles = async () => {

        try {

            const res = await api.get("/parked");

            setVehicles(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    useEffect(() => {

        fetchVehicles();

    }, [refresh]);

    const getSlot = (vehicle, index) => {

        const prefix =
            vehicle.vehicleType === "bike"
                ? "B"
                : vehicle.vehicleType === "car"
                ? "C"
                : "T";

        return `${prefix}-${index + 1}`;

    };

    return (

        <div className="table-card">

            <div className="table-header">

                <div>

                    <h2>Currently Parked Vehicles</h2>

                    <p>Live parking information</p>

                </div>

                <span className="count-badge">

                    {vehicles.length} Parked

                </span>

            </div>

            <table>

                <thead>

                    <tr>

                        <th>Ticket</th>

                        <th>Vehicle</th>

                        <th>Type</th>

                        <th>Slot</th>

                        <th>Entry Time</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        vehicles.length === 0 ?

                        (

                            <tr>

                                <td
                                    colSpan="5"
                                    style={{
                                        textAlign:"center",
                                        padding:"40px"
                                    }}
                                >

                                    No Vehicles Parked

                                </td>

                            </tr>

                        )

                        :

                        vehicles.map((vehicle,index)=>(

                            <tr key={vehicle.ticketId}>

                                <td>{vehicle.ticketId}</td>

                                <td>{vehicle.vehicleNumber}</td>

                                <td>{vehicle.vehicleType}</td>

                                <td>{getSlot(vehicle,index)}</td>

                                <td>

                                    {new Date(vehicle.entryTime).toLocaleString()}

                                </td>

                            </tr>

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}

export default ParkedVehicles;