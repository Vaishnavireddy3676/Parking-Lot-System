CREATE TABLE tickets (
    id SERIAL PRIMARY KEY,
    ticket_id VARCHAR(20) UNIQUE NOT NULL,
    vehicle_number VARCHAR(20) NOT NULL,
    vehicle_type VARCHAR(10) CHECK (vehicle_type IN ('bike','car','truck')),
    entry_time TIMESTAMP NOT NULL,
    exit_time TIMESTAMP,
    amount DECIMAL(6,2),
    status VARCHAR(20) DEFAULT 'parked'
);
