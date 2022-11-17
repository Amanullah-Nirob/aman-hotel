import Router, { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import {Container,Button} from '@mui/material'
import qs from 'query-string';
import useFiltersQuery from '../../hooks/useFiltersQuery';
import { useRoomGetByFilteredQuery } from '../../app/apiSlice/roomApiSlice';
import useSearch from '../../hooks/useSearch';
import useSort from '../../hooks/useSort';
import usePagination from '../../hooks/usePagination';
import { setPageSizeOptions } from '../../utils/appUtils';
import {Grid} from '@mui/material'
import RoomFilters from '../../components/rooms/RoomFilters';
import Head from 'next/head';

const RoomsMain = () => {
  const { searchFilters, handleResetSearchFilters } = useFiltersQuery();
  const { data, error, isLoading }:any = useRoomGetByFilteredQuery(searchFilters);
  const { filteredData, searchTerm, setSearchTerm, handleChangeSearch } = useSearch(data, { searchBy: 'roomNumber'});
  const { sortedItems, sortBy, setSortBy } = useSort(filteredData || [], { path: 'roomNumber', order: 'desc' } as any);
  const {
    itemsListCrop: roomListSliceByPagination, currentPage,pageSize,handleChangePage, handleChangePageSize,
  } = usePagination(sortedItems || [], setPageSizeOptions[1].value);

  
  
    return (
      <>
    <Head>
     <title>Room | AmanHotel</title>
    </Head>
    <div className='rooms_area_main'>
         <Container maxWidth="xl">
         <div className="rooms_all_content">
          <Grid container spacing={0}>
            <Grid item sm={3}>
              <RoomFilters></RoomFilters>
            </Grid>
            <Grid item sm={9}>
             <div style={{backgroundColor:'green',height:'90vh'}}>room main part</div>
            </Grid>
 
          </Grid>
         </div>
         </Container>
        </div>
      </>

    );
};

export default RoomsMain; 