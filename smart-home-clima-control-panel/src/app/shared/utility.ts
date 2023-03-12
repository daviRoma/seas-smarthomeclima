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
}