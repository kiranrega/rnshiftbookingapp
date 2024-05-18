import React from 'react';
import {shallow} from 'enzyme';
import ShiftList from '../src/components/ShiftList';
import ShiftSummary from '../src/components/ShiftSummary';

jest.mock('../src/components/ShiftSummary', () => 'ShiftSummary');

describe('ShiftList', () => {
  const mockData = [
    {
      id: '1',
      startTime: '09:00',
      endTime: '17:00',
      location: 'helsinki',
      actionDisabled: true,
    },
    {
      id: '2',
      startTime: '10:00',
      endTime: '18:00',
      location: 'tampere',
      actionDisabled: false,
    },
  ];

  it('renders available shifts correctly', () => {
    const wrapper = shallow(
      <ShiftList title="2023-05-18" data={mockData} availableShifts={true} />,
    );
    expect(wrapper.find('ShiftItem')).toHaveLength(2);
    expect(wrapper.find('ShiftSummary').exists()).toBe(true);
  });

  it('renders booked shifts correctly', () => {
    const wrapper = shallow(
      <ShiftList title="2023-05-18" data={mockData} availableShifts={false} />,
    );
    expect(wrapper.find('ShiftItem')).toHaveLength(2);
    expect(wrapper.find('ShiftSummary').exists()).toBe(false);
  });
});
