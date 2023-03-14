/**
 * Utility.
 */

export default class Utils {
    
  public static capitalizeWords(str: String) : String {
    return str
      .toLowerCase()
      .split(' ')
      .map((word: String) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  public static getTimeAsString(str: string): String {
    const d = new Date(str);
    return `${d.getHours() < 10 ? "0" + d.getHours() : d.getHours()}:${(d.getMinutes() < 10 ? "0" : "") +
      d.getMinutes()}`;
  }

  public static dateToString(dateObject: Date): string {
    // get the year, month, date, hours, and minutes seprately and append to the string.
    let dateString = dateObject.getFullYear() +
      "-" +
      (dateObject.getMonth() + 1 > 9 ? (dateObject.getMonth() + 1) : "0" + (dateObject.getMonth() + 1)) +
      "-" +
      + dateObject.getDate() + 
      " ";

    dateString += dateObject.getHours() > 9 ? dateObject.getHours() : ("0" + dateObject.getHours()) + ":";
    dateString += (dateObject.getMinutes() > 9 ? dateObject.getMinutes() : ("0" + dateObject.getMinutes())) + ":00";

    return dateString;
  }
}