import React, { useCallback, useEffect,useState } from 'react';
import {Container,Button, Box} from '@mui/material'
import useFiltersQuery from '../../hooks/useFiltersQuery';
import useSort from '../../hooks/useSort';
import {Grid} from '@mui/material'
import RoomFilters from '../../components/rooms/RoomFilters';
import Head from 'next/head';
import BreadCrumb from '../../components/element/BreadCrumb';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import RoomSort from '../../components/rooms/roomsMainContent/roomMainContentHeader/RoomSort';
import RoomDisplayShow from '../../components/rooms/roomsMainContent/roomMainContentHeader/RoomDisplayShow';
import RoomContent from '../../components/rooms/roomsMainContent/RoomContent';
import RoomsListSkeleton from '../../components/rooms/roomsMainContent/roomList/skeleton/RoomsListSkeleton';
import ReactPaginate from 'react-paginate';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import RoomServices from '../../services/RoomServices';
import { setRoomSearchQuery } from '../../app/slices/roomSearch/RoomSearch';
import FilterRooms from '../../components/mobileDrawer/FilterRooms';

export const setPageSizeOptions = [
  { name: '12', value: 12 },
  { name: '15', value: 15 },
  { name: '18', value: 18 }, 
  { name: '24', value: 24 },
];

const RoomsMain= ({data}:any)=> {
  const theme=useAppSelector(selectTheme)
  const { searchFilters, handleResetSearchFilters,setSearchQuery } = useFiltersQuery();
  const { sortedItems, sortBy, setSortBy } = useSort(data?.data || [], { path: 'roomNumber', order: 'desc' } as any);
  const [filterRoomOpen,setFilterRoomOpen]=useState(false)
  const dispatch=useAppDispatch()
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
    },
    [setSortBy]
  );
  
  useEffect(() => {
    dispatch(setRoomSearchQuery(searchFilters));
  }, [searchFilters]); 
  
    return (
      <>
    <Head>
     <title>Room | AmanHotel</title>
     <meta 
      name="theme-color" key="theme-color"
      content={theme ==='light'?'#fff':'#000'}
      />
    </Head>
    <div className='rooms_area_main'>
         <Container maxWidth="xl">
         <Box className="rooms_all_content" sx={{transform:theme==='light'?{sm:'translate(0px, 8vh)',xs:'translate(0px, 7vh)'}:'translate(0px, 10vh)'}}>
         <BreadCrumb breacrumb={breadCrumb} />
          <Grid container spacing={0} className='room_main_grid'>
            <Grid item xl={2} lg={2.5} md={3} sm={4} xs={12} sx={{display:{sm:'block',xs:'none'}}}>
              <RoomFilters filteredData={data?.allData}></RoomFilters>
            </Grid>
            <Grid item xl={10} lg={9.5} md={9} sm={8} xs={12}>
             <div className='roomMainAllContent'>
              <div className="roomMainContentHeader" style={{borderColor:theme==='light'?'rgb(233, 226, 226)':'rgb(68, 66, 66)'}}>
                <RoomSort sortBy={sortBy} onSort={handleSort}></RoomSort>
                <RoomDisplayShow count={data?.pageSize || setPageSizeOptions[0].value } setCount={handlePageSizeChange} options={setPageSizeOptions} ></RoomDisplayShow>
                <Box sx={{display:{sm:'none',xs:'block'}}}>
                <div className="filterBox" onClick={()=>setFilterRoomOpen(true)} style={{cursor:'pointer'}}>
                     More filter
                  </div>
                </Box>
              </div>
              <div className="roomMainContent">
              {sortedItems.length===0 ? <RoomsListSkeleton pageSize={data.pageSize} /> : <RoomContent rooms={sortedItems as any}  />}
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
         <FilterRooms
        open={filterRoomOpen}
        setOpen={setFilterRoomOpen}
        data={data?.allData}
        />
         </Container>
      </div>
     
      </>

    );
};


export async function getServerSideProps({query }:any) { 
  const rooms = await RoomServices.getRooms(query);
  return {
    props: {
      data:rooms
    }
  }
}

export default RoomsMain; 