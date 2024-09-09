import { AppointmentWithData, TimeAgo } from '@/lib/types';
import { format } from 'date-fns';

export function formatDate(
  date: Date,
  locale: string,
  options?: Intl.DateTimeFormatOptions
) {
  return new Date(date).toLocaleDateString(locale, options);
}

export function formatTime(date: Date, locale: string) {
  return date.toLocaleTimeString(locale, {
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Europe/Helsinki',
  });
}

export function groupAppointmentsByMonth(appointments: AppointmentWithData[]) {
  const groupedAppointments: Record<string, AppointmentWithData[]> = {};
  appointments.forEach((app) => {
    const month = format(app.dateTime, 'yyyy-MM');
    if (!groupedAppointments[month]) groupedAppointments[month] = [];
    groupedAppointments[month].push(app);
  });

  return groupedAppointments;
}

export function formatTimeAgo(date: Date): TimeAgo {
  const seconds = Math.floor(
    (new Date().getTime() - new Date(date).getTime()) / 1000
  );
  let interval = Math.floor(seconds / 31_536_000);

  if (interval >= 1) {
    return {
      interval: interval.toString(),
      label: interval === 1 ? 'time_ago.year_ago' : 'time_ago.years_ago',
    };
  }
  interval = Math.floor(seconds / 2_592_000);
  if (interval >= 1) {
    return {
      interval: interval.toString(),
      label: interval === 1 ? 'time_ago.month_ago' : 'time_ago.months_ago',
    };
  }
  interval = Math.floor(seconds / 86_400);
  if (interval >= 1) {
    return {
      interval: interval.toString(),
      label: interval === 1 ? 'time_ago.day_ago' : 'time_ago.days_ago',
    };
  }
  interval = Math.floor(seconds / 3_600);
  if (interval >= 1) {
    return {
      interval: interval.toString(),
      label: interval === 1 ? 'time_ago.hour_ago' : 'time_ago.hours_ago',
    };
  }
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return {
      interval: interval.toString(),
      label: interval === 1 ? 'time_ago.minute_ago' : 'time_ago.minutes_ago',
    };
  }
  return { interval: '', label: 'time_ago.just_now' };
}

export function isBookedLessThanOneHourAgo(time: Date) {
  return new Date().getTime() - new Date(time).getTime() <= 60 * 60 * 1000;
}

export function startsInLessThanOneHour(time: Date) {
  const currentTime = new Date();
  const oneHourInMS = 3_600_000;
  return new Date(time).getTime() - currentTime.getTime() < oneHourInMS;
}

export function getFirstAndLastDateOfMonth(year: number, month: number) {
  const firstDate = new Date(year, month, 1);
  const lastDate = new Date(year, month + 1, 0);
  return { firstDate, lastDate };
}
