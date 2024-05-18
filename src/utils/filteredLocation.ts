import {FormattedData} from './types';

export function filterEventsByLocation(
  data: FormattedData,
  locationName: string,
): FormattedData {
  const filteredEvents: FormattedData = {};

  for (const date in data) {
    if (data.hasOwnProperty(date)) {
      filteredEvents[date] = data[date].filter(event => {
        return event.location.toLocaleLowerCase() === locationName;
      });
    }
  }

  return filteredEvents;
}
