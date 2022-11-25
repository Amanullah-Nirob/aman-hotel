import React from 'react';
import {Avatar,ListItemButton} from '@mui/material';
import { dmSansFont } from '../../utils/nextFont';
import Link from 'next/link';
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';

const SearchView = ({room}:any) => {
    const theme=useAppSelector(selectTheme)
    return (
        <Link href={`/rooms/${room?._id}`} style={{textDecoration:'none',color:theme==='light'?'#000':'#fff'}}>
        <ListItemButton className='search_list_result'>
            <div className='avatar'>
            <Avatar variant="square" src={room?.images[0]} />
            </div>
            <div className="search_listInfo">
                <h3 className={dmSansFont.className}> {room?.type}</h3>
                <p> {room?.price}&#2547; per day</p>
            </div>
        </ListItemButton>
        </Link>
    );
};

export default SearchView;