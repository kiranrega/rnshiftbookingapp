import {renderHook, act} from '@testing-library/react-hooks';
import useFetchAndFormatData from '../src/hooks/useFetchAndFormatData';
import formatData from '../src/utils/formdata';

jest.mock('../src/utils/formdata');

describe('useFetchAndFormatData', () => {
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

  const mockFormattedData = {
    '2023-05-18': mockData,
  };

  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });
    formatData.mockReturnValue(mockFormattedData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches data correctly and updates the state', async () => {
    const {result, waitForNextUpdate} = renderHook(() =>
      useFetchAndFormatData(),
    );

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.data).toEqual(mockFormattedData);
    expect(result.current.loading).toBe(false);
  });

  it('handles errors correctly', async () => {
    global.fetch = jest
      .fn()
      .mockRejectedValue(new Error('Error fetching data'));

    const {result, waitForNextUpdate} = renderHook(() =>
      useFetchAndFormatData(),
    );

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(true);

    await waitForNextUpdate();

    expect(result.current.data).toBeNull();
    expect(result.current.loading).toBe(false);
  });
});
