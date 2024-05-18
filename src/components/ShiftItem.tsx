import React, {useState} from 'react';
import {Alert, StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {FormattedDataItem} from '../utils/types';

interface ShiftItemProps {
  item: FormattedDataItem;
  availableShifts: boolean;
}

const ShiftItem: React.FC<ShiftItemProps> = ({item, availableShifts}) => {
  const [isLoading, setIsLoading] = useState(false);

  const bookShift = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://db2c-115-97-190-116.ngrok-free.app/shifts/${item.id}/book`,
        {
          method: 'POST',
        },
      );
      const data = await response.json();
      setIsLoading(false);
      // Handle the response data if needed
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error booking shift', error as string);
    }
  };

  const cancelShift = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://db2c-115-97-190-116.ngrok-free.app/shifts/${item.id}/cancel`,
        {
          method: 'POST',
        },
      );
      const data = await response.json();
      setIsLoading(false);
      // Handle the response data if needed
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error booking shift', error as string);
    }
  };

  return (
    <>
      <View style={styles.shiftContainer}>
        <View style={styles.textContainer}>
          <Text
            style={
              styles.shiftText
            }>{`${item.startTime}-${item.endTime}`}</Text>
          {availableShifts && (
            <Text style={styles.locationText}>{item.location}</Text>
          )}
        </View>
        {!availableShifts && (
          <Text style={styles.shiftStatusText}>
            {item.actionDisabled && 'Book'}
          </Text>
        )}
        <TouchableOpacity
          style={
            item.actionDisabled
              ? styles.shiftCancelButton
              : styles.shiftBookButton
          }
          onPress={availableShifts ? bookShift : cancelShift}
          disabled={isLoading} // Disable the button while loading
        >
          {isLoading ? (
            <ActivityIndicator
              size="small"
              color={item.actionDisabled ? '#E2006A' : '#16A64D'}
            />
          ) : (
            <Text
              style={
                item.actionDisabled
                  ? styles.shiftCancelButtonText
                  : styles.shiftBookButtonText
              }>
              {item.actionDisabled ? 'Cancel' : 'Book'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
    </>
  );
};

export default ShiftItem;

const styles = StyleSheet.create({
  shiftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  shiftText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#4F6C92',
  },
  locationText: {
    flex: 1,
    color: '#A4B8D3',
    fontSize: 16,
  },
  shiftCancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: '#E2006A',
    borderWidth: 1,
    width: 80,
  },
  shiftCancelButtonText: {
    color: '#E2006A',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#CBD2E1',
    marginBottom: 10,
  },
  textContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 5,
    paddingVertical: 10,
  },
  shiftStatusText: {
    color: '#4F6C92',
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'left',
  },
  shiftBookButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderColor: '#55CB82',
    borderWidth: 1,
    width: 80,
  },
  shiftBookButtonText: {
    color: '#16A64D',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
