export interface RawData {
  id: string;
  booked: boolean;
  area: string;
  startTime: number;
  endTime: number;
}

export interface FormattedDataItem {
  id: string;
  startTime: string;
  endTime: string;
  location: string;
  actionDisabled: boolean;
}

export type FormattedData = {[date: string]: FormattedDataItem[]};
