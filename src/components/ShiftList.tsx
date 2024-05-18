import React from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import ShiftItem from './ShiftItem';
import {FormattedDataItem} from '../utils/types';
import ShiftSummary from './ShiftSummary';

interface ShiftListProps {
  title: string;
  data: FormattedDataItem[];
  availableShifts: boolean;
}

const ShiftList: React.FC<ShiftListProps> = ({
  title,
  data,
  availableShifts,
}) => {
  return (
    <>
      {data.length === 0 ? (
        <Text>No Items Display</Text>
      ) : (
        <View>
          <View style={styles.summaryContainer}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {availableShifts && <ShiftSummary data={data} />}
          </View>
          <View style={styles.separator} />
          <FlatList
            data={data}
            renderItem={({item}) => (
              <ShiftItem item={item} availableShifts={availableShifts} />
            )}
            keyExtractor={item => item.id}
            maxToRenderPerBatch={10}
          />
        </View>
      )}
    </>
  );
};

export default ShiftList;

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#4F6C92',
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#CBD2E1',
  },
  summaryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
