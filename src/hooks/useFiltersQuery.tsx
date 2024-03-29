import qs from 'query-string';
import { useCallback, useMemo } from 'react';
import omit from 'lodash.omit';
import { useClientRouter } from "use-client-router";
import { useRouter } from 'next/router';

const useFiltersQuery = () => {
  // const router= useClientRouter()
  const router= useRouter()
  const searchQuery= router.asPath.slice(7)

  const searchFilters = useMemo(() => qs.parse(searchQuery, { parseNumbers: true, parseBooleans: true }), [searchQuery]);

  const setSearchQuery = useCallback(
    (filter: Record<string, any>) => {
      const search = qs.stringify(filter); 
      router.replace({ search });
    },
    [router]
  );

  const clearFilter = useCallback(
    ({ target }:any) => {
      const { name } = target;  
      const newFilter = omit(searchFilters, name);
      setSearchQuery(newFilter);
    },
    [searchFilters, setSearchQuery]
  );

  
  const handleChangeFilter = useCallback(
    ({ target }:any) => {  
      const { name, value } = target;
      if (value === false || value === 0) {
        const newFilter = { ...searchFilters, [name]: value };
        return clearFilter({ target });
      }
      const newFilter = { ...searchFilters, [name]: value,['page']:1 };
      return setSearchQuery(newFilter);
    },

    [searchFilters, setSearchQuery, clearFilter]
  );
  const handleResetSearchFilters = useCallback(() => {
    router.replace({});
  }, [router]);

  return { searchFilters, handleChangeFilter, handleResetSearchFilters,setSearchQuery };
};

export default useFiltersQuery;
