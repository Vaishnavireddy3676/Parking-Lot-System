import { useState } from "react";
import "./App.css";

import Availability from "./components/Availability";
import ParkVehicle from "./components/ParkVehicle";
import ExitVehicle from "./components/ExitVehicle";
import Ticket from "./components/Ticket";
import ParkedVehicles from "./components/ParkedVehicles";

function App() {

    const [refresh, setRefresh] = useState(false);

    const [ticket, setTicket] = useState(null);

    const refreshAll = () => {
        setRefresh(prev => !prev);
    };

    return (

        <div className="dashboard">

            <header className="header">

                <h1>Parking lot management</h1>

                <p>Live parking dashboard</p>

            </header>

            <Availability refresh={refresh} />

            <div className="forms">

                <ParkVehicle
                    refresh={refreshAll}
                    setTicket={setTicket}
                />

                <ExitVehicle
                    refresh={refreshAll}
                />

            </div>

            <Ticket ticket={ticket} />

            <ParkedVehicles refresh={refresh} />

        </div>

    );

}

export default App;