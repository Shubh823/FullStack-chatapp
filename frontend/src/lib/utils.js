export function formatMessageTime(date) {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false, // Set to true for 12-hour format if needed
 // Indian Standard Time (Mumbai timezone)
    });
  }
  