class TimeService {
  public static daysToMilliseconds(days: number) {
    return days * 24 * 60 * 60 * 1000;
  }
}

export default TimeService;
