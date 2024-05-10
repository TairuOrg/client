export default function formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric', 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    };
    const formattedDate: string = new Intl.DateTimeFormat('en-US', options).format(date);
    return formattedDate;
  }
  