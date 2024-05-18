import React from 'react';
import {shallow} from 'enzyme';
import ShiftItem from '../src/components/ShiftItem';
import {FormattedDataItem} from '../src/utils/types';

describe('ShiftItem', () => {
  const mockAvailableShift: FormattedDataItem = {
    id: '1',
    startTime: '09:00',
    endTime: '17:00',
    location: 'helsinki',
    actionDisabled: false,
  };

  const mockBookedShift: FormattedDataItem = {
    id: '2',
    startTime: '10:00',
    endTime: '18:00',
    location: 'tampere',
    actionDisabled: true,
  };

  let wrapper;

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders available shift correctly', () => {
    wrapper = shallow(
      <ShiftItem item={mockAvailableShift} availableShifts={true} />,
    );
    expect(wrapper.find('Text').at(0).text()).toBe('09:00-17:00');
    expect(wrapper.find('Text').at(1).text()).toBe('helsinki');
    expect(wrapper.find('TouchableOpacity').text()).toBe('Book');
  });

  it('renders booked shift correctly', () => {
    wrapper = shallow(
      <ShiftItem item={mockBookedShift} availableShifts={false} />,
    );
    expect(wrapper.find('Text').at(0).text()).toBe('10:00-18:00');
    expect(wrapper.find('Text').at(1).text()).toBe('Book');
    expect(wrapper.find('TouchableOpacity').text()).toBe('Cancel');
  });

  it('calls bookShift when "Book" button is clicked', () => {
    wrapper = shallow(
      <ShiftItem item={mockAvailableShift} availableShifts={true} />,
    );
    const bookShiftSpy = jest.spyOn(wrapper.instance(), 'bookShift');
    wrapper.find('TouchableOpacity').simulate('press');
    expect(bookShiftSpy).toHaveBeenCalled();
  });

  it('calls cancelShift when "Cancel" button is clicked', () => {
    wrapper = shallow(
      <ShiftItem item={mockBookedShift} availableShifts={false} />,
    );
    const cancelShiftSpy = jest.spyOn(wrapper.instance(), 'cancelShift');
    wrapper.find('TouchableOpacity').simulate('press');
    expect(cancelShiftSpy).toHaveBeenCalled();
  });
});
