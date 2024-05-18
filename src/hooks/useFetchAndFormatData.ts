import {useState, useEffect} from 'react';
import {FormattedData, RawData} from '../utils/types';
import formatData from '../utils/formdata';

const useFetchAndFormatData = () => {
  const [data, setData] = useState<FormattedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://db2c-115-97-190-116.ngrok-free.app/shifts',
        );
        const jsonData: RawData[] = await response.json();
        const formattedData = formatData(jsonData);
        setData(formattedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching or processing data:', error);
        setLoading(false);
        setError(error as string);
      }
    };

    fetchData();
  }, []);

  return {data, loading, error};
};

export default useFetchAndFormatData;
