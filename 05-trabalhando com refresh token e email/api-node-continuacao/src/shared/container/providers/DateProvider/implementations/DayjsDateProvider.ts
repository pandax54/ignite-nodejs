import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date);
  }
  addHours(hours: number): Date {
    return dayjs().add(hours, "hour").toDate();
  }
  addDays(days: number): Date {
    // add days
    return dayjs().add(days, "days").toDate();
  }
  compareInDays(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);
    const compare = dayjs(end_date_utc).diff(start_date_utc, "days");

    return compare;
  }
  compareInHours(start_date: Date, end_date: Date): number {
    const start_date_utc = this.convertToUTC(start_date);
    const end_date_utc = this.convertToUTC(end_date);
    const compare = dayjs(end_date_utc).diff(start_date_utc, "hours");

    return compare;
  }
  convertToUTC(date: Date): string {
    const formattedDate = dayjs(date) // data formatada
      .utc()
      .local()
      .format();
    return formattedDate;
  }
  dateNow(): Date {
    return dayjs().toDate();
  }
}

export { DayjsDateProvider };
