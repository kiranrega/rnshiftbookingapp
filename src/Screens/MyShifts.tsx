import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import ShiftList from '../components/ShiftList';
import useFetchAndFormatData from '../hooks/useFetchAndFormatData';
import {FormattedData} from '../utils/types';
import GreenSpinner from '../assets/spinner_green.svg';

const MyShifts: React.FC = () => {
  const {data, loading, error} = useFetchAndFormatData();
  const [filteredData, setFilteredData] = useState<FormattedData>();

  useEffect(() => {
    const filteredData: FormattedData = {};
    for (const date in data) {
      if (data.hasOwnProperty(date)) {
        filteredData[date] = data[date].filter(event => {
          return event.actionDisabled;
        });
      }
    }
    setFilteredData(filteredData);
  }, [data]);

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
      keyExtractor={item => item[0]}
      renderItem={({item}) => (
        <ShiftList title={item[0]} data={item[1]} availableShifts />
      )}
    />
  );
};

export default MyShifts;

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
