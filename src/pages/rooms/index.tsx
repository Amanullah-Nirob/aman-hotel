import React, { useCallback, } from 'react';
import {Container,Button, Box} from '@mui/material'
import useFiltersQuery from '../../hooks/useFiltersQuery';
import { useRoomGetByFilteredQuery } from '../../app/apiSlice/roomApiSlice';
import useSort from '../../hooks/useSort';
import {Grid} from '@mui/material'
import RoomFilters from '../../components/rooms/RoomFilters';
import Head from 'next/head';
import BreadCrumb from '../../components/element/BreadCrumb';
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import RoomSort from '../../components/rooms/roomsMainContent/roomMainContentHeader/RoomSort';
import RoomDisplayShow from '../../components/rooms/roomsMainContent/roomMainContentHeader/RoomDisplayShow';
import RoomContent from '../../components/rooms/roomsMainContent/RoomContent';
import RoomsListSkeleton from '../../components/rooms/roomsMainContent/roomList/skeleton/RoomsListSkeleton';
import ReactPaginate from 'react-paginate';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';

export const setPageSizeOptions = [
  { name: '9', value: 9 },
  { name: '12', value: 12 },
  { name: '18', value: 18 }, 
  { name: '24', value: 24 },
];


const RoomsMain = () => {
  const theme=useAppSelector(selectTheme)
  const { searchFilters, handleResetSearchFilters,setSearchQuery } = useFiltersQuery();
  const { data, error, isLoading,isError }:any = useRoomGetByFilteredQuery(searchFilters); 
  const { sortedItems, sortBy, setSortBy } = useSort(data?.data || [], { path: 'roomNumber', order: 'desc' } as any);

  const breadCrumb = [
    {text:'Home',url: '/'},
    {text: 'Rooms'}
  ];



  const handlePageChange = ({ selected,pageLimit }: { selected: number,pageLimit?:number }) => {
    const currentPage = selected + 1;
    const newUrl = { ...searchFilters, ['page']: currentPage };
    setSearchQuery(newUrl)
  };
 
  const handlePageSizeChange = useCallback((event: { target: { value: string; }; }) => {
    const pageLimit=parseInt(event.target.value)
     const newUrl = { ...searchFilters, ['limit']: pageLimit };
    setSearchQuery(newUrl)
  }, []);

  const handleSort = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSortBy(JSON.parse(event.target.value));
      handlePageChange({selected: 1}); 
    },
    [setSortBy]
  );


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
              <RoomFilters filteredData={data?.allData}></RoomFilters>
            </Grid>
            <Grid item xl={10} lg={9.5} md={9} sm={8} xs={12}>
             <div className='roomMainAllContent'>
              <div className="roomMainContentHeader" style={{borderColor:theme==='light'?'rgb(233, 226, 226)':'rgb(68, 66, 66)'}}>
                <RoomSort sortBy={sortBy} onSort={handleSort}></RoomSort>
                <RoomDisplayShow count={data?.pageSize || setPageSizeOptions[0].value } setCount={handlePageSizeChange} options={setPageSizeOptions} ></RoomDisplayShow>
              </div>
              <div className="roomMainContent">
              {isLoading ? <RoomsListSkeleton pageSize={12} /> : <RoomContent rooms={sortedItems as any}  />}
              </div>

              <div className="room_pagination">
              <ReactPaginate
              className="pagination"
              pageCount={data?.pages || 12}
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              forcePage={data?.page -1 || 0}
              previousLabel={<ArrowBackIosNewOutlinedIcon fontSize={'small'} />}
              nextLabel={<ArrowForwardIosOutlinedIcon fontSize={'small'} />}
              onPageChange={handlePageChange}
              activeClassName="active"
              />
              </div>
             </div>
            </Grid>
          </Grid>
         </Box> 
         </Container>
      </div>
      </>

    );
};

export default RoomsMain; 