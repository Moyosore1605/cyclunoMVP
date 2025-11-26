/**
 * Formats an ISO 8601 date string into a custom "Created Month Day, Year" format.
 * @param {string} isoDateString - The raw timestamp string (e.g., "2025-11-26T06:33:06.617Z")
 * @returns {string} The formatted date string (e.g., "Created Nov 26, 2025")
 */
export const formatCreationDate = (isoDateString) => {
    if (!isoDateString) {
        return "Date Unavailable";
    }
    
    // Create a Date object from the ISO string
    const date = new Date(isoDateString);
    
    // Check if the date object is valid
    if (isNaN(date.getTime())) {
        return "Invalid Date Format";
    }

    // Options for desired format: Month (short), Day (numeric), Year (numeric)
    const options = { year: 'numeric', month: 'short', day: 'numeric' };

    // Format the date using the user's local timezone
    const formattedDate = date.toLocaleDateString('en-US', options);

    // Add the "Created" prefix
    return `Created ${formattedDate}`;
};

// Example usage (if needed): 
// const formatted = formatCreationDate("2025-11-26T06:33:06.617507Z"); // "Created Nov 26, 2025"