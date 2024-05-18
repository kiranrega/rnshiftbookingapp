import React from 'react';
import {shallow} from 'enzyme';
import MyShifts from '../src/Screens/MyShifts';
import useFetchAndFormatData from '../src/hooks/useFetchAndFormatData';

jest.mock('../src/hooks/useFetchAndFormatData');

describe('MyShifts', () => {
  const mockData = {
    '2023-05-18': [
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
        location: 'helsinki',
        actionDisabled: false,
      },
    ],
  };

  const mockFilteredData = {
    '2023-05-18': [
      {
        id: '1',
        startTime: '09:00',
        endTime: '17:00',
        location: 'helsinki',
        actionDisabled: true,
      },
    ],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    useFetchAndFormatData.mockReturnValue({
      data: null,
      loading: true,
      error: null,
    });
    const wrapper = shallow(<MyShifts />);
    expect(wrapper.find('GreenSpinner').exists()).toBe(true);
  });

  it('renders error state correctly', () => {
    useFetchAndFormatData.mockReturnValue({
      data: null,
      loading: false,
      error: 'Error fetching data',
    });
    const wrapper = shallow(<MyShifts />);
    expect(wrapper.find('Text').text()).toContain('Error fetching data');
  });

  it('renders data correctly', () => {
    useFetchAndFormatData.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });
    const wrapper = shallow(<MyShifts />);
    expect(wrapper.find('ShiftList').exists()).toBe(true);
    expect(wrapper.state('filteredData')).toEqual(mockFilteredData);
  });
});
