import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import ShiftList from '../components/ShiftList';
import useFetchAndFormatData from '../hooks/useFetchAndFormatData';
import {filterEventsByLocation} from '../utils/filteredLocation';
import GreenSpinner from '../assets/spinner_green.svg';

interface AvailableShiftsProps {
  route: {
    params: {
      name: string;
    };
  };
}

const AvailableShifts: React.FC<AvailableShiftsProps> = ({route}) => {
  const {data, loading, error} = useFetchAndFormatData();

  const {name} = route.params || {};

  const filteredData = data && filterEventsByLocation(data, name);

  if (loading) {
    return (
      <View style={styles.iconContainer}>
        <GreenSpinner />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={Object.entries(filteredData || {})}
      keyExtractor={item => item[0]} // Use the date as the key
      renderItem={({item}) => (
        <ShiftList
          title={item[0]} // Pass the date as the title
          data={item[1]} // Pass the shifts as the data
          availableShifts={false}
        />
      )}
    />
  );
};

export default AvailableShifts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 10,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
