import { Button, Grid } from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { removeFavorite, selectFavorites } from '../../../app/slices/favorites/Favorites';
import RoomCard from '../../../components/rooms/roomsMainContent/roomList/roomCard/RoomCard';
import FavoriteIcon from '@mui/icons-material/Favorite';

const Favorites = () => {
    const favorites=useAppSelector(selectFavorites)
    const dispatch=useAppDispatch()
    const handleCancelFavorite=(room:any)=>{
        dispatch(removeFavorite(room))
    }
    return (
        <div>
            <Grid container >
                {favorites.map((favorite:any)=>(
                    <Grid item sm={4}>
                        <div className="favorite_box">
                        <RoomCard {...favorite}></RoomCard>
                        <Button className='favCancel' startIcon={<FavoriteIcon/>} onClick={()=>handleCancelFavorite(favorite)}>cancel</Button>
                        </div>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Favorites;