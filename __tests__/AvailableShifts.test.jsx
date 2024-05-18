import React from 'react';
import {shallow} from 'enzyme';
import AvailableShifts from '../src/Screens/AvailableShifts';
import useFetchAndFormatData from '../src/hooks/useFetchAndFormatData';
import {filterEventsByLocation} from '../src/utils/filteredLocation';

jest.mock('../src/hooks/useFetchAndFormatData');
jest.mock('../src/utils/filteredLocation');

describe('AvailableShifts', () => {
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

  const mockRoute = {
    params: {
      name: 'helsinki',
    },
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
    const wrapper = shallow(<AvailableShifts route={mockRoute} />);
    expect(wrapper.find('GreenSpinner').exists()).toBe(true);
  });

  it('renders error state correctly', () => {
    useFetchAndFormatData.mockReturnValue({
      data: null,
      loading: false,
      error: 'Error fetching data',
    });
    const wrapper = shallow(<AvailableShifts route={mockRoute} />);
    expect(wrapper.find('Text').text()).toContain('Error fetching data');
  });

  it('renders data correctly', () => {
    useFetchAndFormatData.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });
    filterEventsByLocation.mockReturnValue(mockData);
    const wrapper = shallow(<AvailableShifts route={mockRoute} />);
    expect(wrapper.find('ShiftList').exists()).toBe(true);
    expect(filterEventsByLocation).toHaveBeenCalledWith(mockData, 'helsinki');
  });
});
