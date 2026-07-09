function calculateFare(entryTime, exitTime) {

    const diff = new Date(exitTime) - new Date(entryTime);

    const hours = Math.ceil(diff / (1000 * 60 * 60));

    let amount = 0;

    if (hours <= 3) {
        amount = 30;
    } else if (hours <= 6) {
        amount = 85;
    } else {
        amount = 120;
    }

    return {
        durationHours: hours,
        amount
    };
}

module.exports = calculateFare;