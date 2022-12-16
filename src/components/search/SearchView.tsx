import React from 'react';
import {Avatar,ListItemButton,useMediaQuery} from '@mui/material';
import { dmSansFont } from '../../utils/nextFont';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import { truncateString } from '../../utils/appUtils';
import { removeRecentHistoryData, setRecentHistoryData } from '../../app/slices/RecentHistorySearch';
import ClearIcon from '@mui/icons-material/Clear';

const SearchView = ({room,isMobileOpenTrue,setIsMobileSet,searchHistory}:any) => {
    const theme=useAppSelector(selectTheme)
    const mediaMobile=useMediaQuery('(max-width:600px)')
    const dispatch=useAppDispatch()
    
    const handleMobileClose=(room:any)=>{
        isMobileOpenTrue && setIsMobileSet(false);
       dispatch(setRecentHistoryData(room))
    }
    
    const handleCloseHistory=(roomId:any)=>{
       dispatch(removeRecentHistoryData(roomId))
    }
    
    return (
        <ListItemButton className='search_show_main_card'>
        <Link href={`/rooms/${room?._id}`} style={{textDecoration:'none',color:theme==='light'?'#000':'#fff'}} onClick={()=>handleMobileClose(room)}>
        <div className='search_list_result'>
            <div className='avatar'>
            <Avatar variant="square" sx={{width:50,height:48,'>img':{objectFit:'cover'}}}  src={room?.images[0]} />
            </div>
            <div className='info_and_search'>
            <div className="search_listInfo">
                <h3 className={dmSansFont.className}>{mediaMobile?truncateString(room.title,28,28):truncateString(room.title,24,24)}</h3>
                <p> {room?.price} &#2547; Per Night</p>
            </div>
            </div>
        </div>
        </Link>
        {searchHistory &&(
            <div className='cancel_history'>
                <ClearIcon sx={{fontSize:'15px'}} onClick={()=>handleCloseHistory(room?._id)} />
            </div>
        )}
        </ListItemButton>
      
    );
};

export default SearchView;