import React from 'react';
import {shallow} from 'enzyme';
import App from '../App';
import useFetchAndFormatData from '../src/hooks/useFetchAndFormatData';
import {filterEventsByLocation} from '../src/utils/filteredLocation';

jest.mock('../src/hooks/useFetchAndFormatData');
jest.mock('../src/utils/filteredLocation');

describe('App', () => {
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
        location: 'tampere',
        actionDisabled: false,
      },
      {
        id: '3',
        startTime: '11:00',
        endTime: '19:00',
        location: 'turku',
        actionDisabled: false,
      },
    ],
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders HomeTopTabs correctly with correct shift counts', () => {
    useFetchAndFormatData.mockReturnValue({
      data: mockData,
      loading: false,
      error: null,
    });
    filterEventsByLocation
      .mockReturnValueOnce(mockData)
      .mockReturnValueOnce({'2023-05-18': [mockData['2023-05-18'][1]]})
      .mockReturnValueOnce({'2023-05-18': [mockData['2023-05-18'][2]]});

    const wrapper = shallow(<App />);
    expect(wrapper.find('TopTab.Screen').at(0).prop('name')).toBe(
      'Helsinki (1)',
    );
    expect(wrapper.find('TopTab.Screen').at(1).prop('name')).toBe(
      'Tampere (1)',
    );
    expect(wrapper.find('TopTab.Screen').at(2).prop('name')).toBe('Turku (1)');
  });

  it('renders BottomTabs correctly', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('BottomTab.Navigator').exists()).toBe(true);
    expect(wrapper.find('BottomTab.Screen').at(0).prop('name')).toBe(
      'My Shifts',
    );
    expect(wrapper.find('BottomTab.Screen').at(1).prop('name')).toBe(
      'Available Shifts',
    );
  });
});
