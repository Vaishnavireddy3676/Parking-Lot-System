import { useEffect, useState } from "react";
import api from "../services/api";

function Availability({ refresh }) {

    const [slots, setSlots] = useState({
        bike: { total: 5, available: 5 },
        car: { total: 5, available: 5 },
        truck: { total: 2, available: 2 }
    });

    useEffect(() => {
        fetchSlots();
    }, [refresh]);

    const fetchSlots = async () => {
        try {
            const res = await api.get("/slots");
            setSlots(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const Card = ({ title, icon, color, data }) => {

        const occupied = data.total - data.available;
        const percentage = (occupied / data.total) * 100;

        return (

            <div className="availability-card">

                <div className="card-header">

                    <div className="title">

                        <div
                            className="icon-circle"
                            style={{ background: color }}
                        >
                            {icon}
                        </div>

                        <div>
                            <h3>{title}</h3>
                            <small>Parking Slots</small>
                        </div>

                    </div>

                    <span
                        className={
                            data.available === 0
                                ? "badge full"
                                : "badge available"
                        }
                    >
                        {data.available === 0
                            ? "Full"
                            : `${data.available} Available`}
                    </span>

                </div>

                <div className="card-body">

                    <div className="number">

                        {data.available}

                    </div>

                    <div className="text">

                        Available of {data.total}

                    </div>

                </div>

                <div className="progress-bar">

                    <div
                        className="progress-fill"
                        style={{
                            width: `${percentage}%`,
                            background: color
                        }}
                    ></div>

                </div>

            </div>

        );
    };

    return (

        <div>

            <div className="summary">

                <h2>Current Availability</h2>

                <span>

                    {slots.bike.available +
                        slots.car.available +
                        slots.truck.available}

                    {" "}Free Slots

                </span>

            </div>

            <div className="availability-grid">

                <Card
                    title="Bike"
                    icon="🏍️"
                    color="#3B82F6"
                    data={slots.bike}
                />

                <Card
                    title="Car"
                    icon="🚗"
                    color="#7C3AED"
                    data={slots.car}
                />

                <Card
                    title="Truck"
                    icon="🚚"
                    color="#F59E0B"
                    data={slots.truck}
                />

            </div>

        </div>

    );

}

export default Availability;