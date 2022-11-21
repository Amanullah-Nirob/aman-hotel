import Router, { useRouter } from 'next/router';
import React, { useCallback, useEffect } from 'react';
import {Container,Button, Box} from '@mui/material'
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
import BreadCrumb from '../../components/element/BreadCrumb';
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';



const RoomsMain = () => {
  const theme=useAppSelector(selectTheme)
  const { searchFilters, handleResetSearchFilters } = useFiltersQuery();
  const { data, error, isLoading,isError }:any = useRoomGetByFilteredQuery(searchFilters);
  const { filteredData, searchTerm, setSearchTerm, handleChangeSearch } = useSearch(data, { searchBy: 'roomNumber'});
  const { sortedItems, sortBy, setSortBy } = useSort(filteredData || [], { path: 'roomNumber', order: 'desc' } as any);
  const {
    itemsListCrop: roomListSliceByPagination, currentPage,pageSize,handleChangePage, handleChangePageSize,
  } = usePagination(sortedItems || [], setPageSizeOptions[1].value);

  const breadCrumb = [
    {text:'Home',url: '/'},
    {text: 'Rooms'}
  ];

    return (
      <>
    <Head>
     <title>Room | AmanHotel</title>
    </Head>
    <div className='rooms_area_main'>
         <Container maxWidth="xl">
         <Box className="rooms_all_content" sx={{transform:theme==='light'?{sm:'translate(0px, 8vh)',xs:'translate(0px, 9vh)'}:'translate(0px, 10vh)'}}>
         <BreadCrumb breacrumb={breadCrumb} />
          <Grid container spacing={0}>
            <Grid item xl={2} lg={2.5} md={3} sm={4} xs={12}>
              <RoomFilters filteredData={filteredData}></RoomFilters>
            </Grid>
            <Grid item xl={10} lg={9.5} md={9} sm={8} xs={12} sx={{padding:'20px',backgroundColor:'green'}}>
             {data?.map((singleData:any)=> <ul key={singleData._id}>
              <li>{singleData.price}</li>
             </ul>)}
            </Grid>
          </Grid>
         </Box> 
         </Container>
      </div>
      </>

    );
};

export default RoomsMain; 