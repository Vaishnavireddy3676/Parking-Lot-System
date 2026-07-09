import { useState } from "react";
import api from "../services/api";

function ExitVehicle({ refreshSlots, refreshParked }) {

    const [ticketId,setTicketId]=useState("");

    const [receipt,setReceipt]=useState(null);

    const [loading,setLoading]=useState(false);

    const [message,setMessage]=useState("");

    const handleExit=async(e)=>{

        e.preventDefault();

        setLoading(true);

        setMessage("");

        try{

            const res=await api.post("/exit",{
                ticketId
            });

            setReceipt(res.data.receipt);

            setMessage("Vehicle Exited Successfully");

            setTicketId("");

            refreshSlots();

            refreshParked();

        }
        catch(err){

            setReceipt(null);

            setMessage(
                err.response?.data?.message ||
                "Server Error"
            );

        }

        setLoading(false);

    }

    return(

        <div className="form-card">

            <h2>Exit a vehicle</h2>

            <p className="subtitle">

                Calculates the fare

            </p>

            <form onSubmit={handleExit}>

                <label>

                    Ticket ID or vehicle number

                </label>

                <input

                    placeholder="TKT-1001"

                    value={ticketId}

                    onChange={(e)=>setTicketId(e.target.value)}

                    required

                />

                <button>

                    {loading?

                        "Calculating..."

                        :

                        "Exit and calculate fare"

                    }

                </button>

            </form>

            {

                message &&

                <p

                style={{

                    color:message.includes("Successfully")?

                    "green"

                    :

                    "red",

                    marginTop:15,

                    fontWeight:600

                }}

                >

                    {message}

                </p>

            }

            {

                receipt &&

                <>

                <hr
                style={{
                    margin:"20px 0",
                    border:"1px dashed #ddd"
                }}
                />

                <div
                className="receipt"
                >

                    <div>

                        <span>Duration</span>

                        <b>

                            {receipt.durationHours} hours

                        </b>

                    </div>

                    <div>

                        <span>Amount due</span>

                        <b
                        style={{
                            color:"green",
                            fontSize:28
                        }}
                        >

                            ₹{receipt.amount}

                        </b>

                    </div>

                </div>

                </>

            }

        </div>

    );

}

export default ExitVehicle;