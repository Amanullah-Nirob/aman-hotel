import { useEffect, useState } from 'react';
import {useDebounce} from '../utils/appUtils';

export default function useSearch<T>(data: Array<T>, config: { searchBy: string }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setData] = useState(data || []);


  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const dataFiltered = data.filter((item: any) =>
        item[config.searchBy].toString().toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setData(dataFiltered);
    } else {
      setData(data);
    } 
  }, [debouncedSearchTerm, data]);

  return { filteredData, searchTerm, setSearchTerm, handleChangeSearch};
}