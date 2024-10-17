function formatDate(date: Date): string {
    // Get the day and determine the appropriate suffix
    const day = date.getDate();
    let suffix = 'th';
    if (day % 10 === 1 && day !== 11) {
        suffix = 'st';
    } else if (day % 10 === 2 && day !== 12) {
        suffix = 'nd';
    } else if (day % 10 === 3 && day !== 13) {
        suffix = 'rd';
    }

    // Format the date components
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    // Format the time components
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; // Convert to 12-hour format

    // Combine the formatted parts
    return `${month} ${day}${suffix}, ${year} at ${hours}:${minutes} ${period}`;
}

export default formatDate;