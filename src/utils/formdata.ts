// utils/formatData.ts
import {FormattedData, RawData} from './types';

const getTimeString = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

const formatDateKey = (dateStr: string): string => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
};

const formatData = (jsonData: RawData[]): FormattedData => {
  const groupByDate: FormattedData = jsonData.reduce(
    (acc: FormattedData, item) => {
      const startDate = new Date(item.startTime);
      const endDate = new Date(item.endTime);
      let currentDate = startDate;
      while (currentDate <= endDate) {
        const dateStr = currentDate.toISOString().split('T')[0];
        if (!acc[dateStr]) {
          acc[dateStr] = [];
        }
        acc[dateStr].push({
          id: item.id,
          startTime: getTimeString(item.startTime),
          endTime: getTimeString(item.endTime),
          location: item.area,
          actionDisabled: item.booked,
        });
        currentDate.setDate(currentDate.getDate() + 1);
      }
      return acc;
    },
    {},
  );

  const today = new Date();
  const tomorrow = new Date(Date.now() + 86400000);
  const formattedData: FormattedData = Object.fromEntries(
    Object.entries(groupByDate).map(([date, value]) => [
      formatDateKey(date),
      value,
    ]),
  );

  const data: FormattedData = {
    [formatDateKey(today.toISOString().split('T')[0])]:
      formattedData[formatDateKey(today.toISOString().split('T')[0])] || [],
    [formatDateKey(tomorrow.toISOString().split('T')[0])]:
      formattedData[formatDateKey(tomorrow.toISOString().split('T')[0])] || [],
    ...Object.fromEntries(
      Object.entries(formattedData).filter(
        ([date]) =>
          date !== formatDateKey(today.toISOString().split('T')[0]) &&
          date !== formatDateKey(tomorrow.toISOString().split('T')[0]),
      ),
    ),
  };

  return data;
};

export default formatData;
