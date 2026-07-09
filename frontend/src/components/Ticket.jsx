function Ticket({ ticket }) {

    if (!ticket) return null;

    return (

        <div className="ticket-card">

            <div className="ticket-header">

                <div>
                    <h2>Sample Ticket</h2>
                    <p>Your generated parking ticket</p>
                </div>

                <span className="ticket-badge">
                    Active
                </span>

            </div>

            <div className="ticket-grid">

                <div className="ticket-item">
                    <span>Ticket ID</span>
                    <b>{ticket.ticketId}</b>
                </div>

                <div className="ticket-item">
                    <span>Vehicle Number</span>
                    <b>{ticket.vehicleNumber}</b>
                </div>

                <div className="ticket-item">
                    <span>Vehicle Type</span>
                    <b>{ticket.vehicleType.toUpperCase()}</b>
                </div>

                <div className="ticket-item">
                    <span>Entry Time</span>
                    <b>
                        {new Date(ticket.entryTime).toLocaleTimeString()}
                    </b>
                </div>

            </div>

        </div>

    );

}

export default Ticket;