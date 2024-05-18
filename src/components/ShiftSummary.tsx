import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {FormattedDataItem} from '../utils/types';

interface ShiftSummaryProps {
  data: FormattedDataItem[];
}

const ShiftSummary: React.FC<ShiftSummaryProps> = ({data}) => {
  const totalShifts = data.length;
  const totalHours = data.reduce((sum, shift) => {
    const startTime = new Date(`1970-01-01T${shift.startTime}:00`).getTime();
    const endTime = new Date(`1970-01-01T${shift.endTime}:00`).getTime();
    const shiftDuration = endTime - startTime;
    return sum + shiftDuration / (1000 * 60 * 60);
  }, 0);

  return (
    <Text style={styles.text}>
      {totalShifts} shift{totalShifts !== 1 ? 's' : ''} ,{' '}
      {totalHours.toFixed(1)} h
    </Text>
  );
};

export default ShiftSummary;

const styles = StyleSheet.create({
  text: {
    color: '#A4B8D3',
    fontSize: 16,
  },
});
