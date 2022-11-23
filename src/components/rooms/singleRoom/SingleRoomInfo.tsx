import React from 'react';
import {Grid,Divider,Paper} from '@mui/material'
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalLaundryServiceOutlinedIcon from '@mui/icons-material/LocalLaundryServiceOutlined';
import CountertopsOutlinedIcon from '@mui/icons-material/CountertopsOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import SmokingRoomsOutlinedIcon from '@mui/icons-material/SmokingRoomsOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { dmSansFont,dmFont } from '../../../utils/nextFont';

const comfortIconsMap: { [x: string]: JSX.Element } = {
    hasWifi: <div className='facilities_info_icon'>
                <WifiIcon sx={{color:'rgb(92, 152, 242)'}} />
                <p>Wifi always available </p>
             </div>,
    hasConditioner: <div className='facilities_info_icon'>
                     <AcUnitIcon sx={{color:'rgb(92, 152, 242)'}} />
                     <p>Conditioner vailable</p>
                    </div>,
    hasWorkSpace: <div className='facilities_info_icon'>
                   <WorkOutlineOutlinedIcon sx={{color:'rgb(92, 152, 242)'}} />
                    <p>Big workplace</p>
                   </div>,
    hasWashingMachine: <div className='facilities_info_icon'>
                        <LocalLaundryServiceOutlinedIcon sx={{color:'rgb(92, 152, 242)'}} />
                        <p>Washing Machine available</p>
                        </div>,
    hasKitchen:<div className='facilities_info_icon'>
                <CountertopsOutlinedIcon sx={{color:'rgb(92, 152, 242)'}} />
                <p>Kitchen open for you</p>
                </div>
};
const conditionIconsMap: { [x: string]: JSX.Element } = {
    guestAllow: <div className='facilities_info_icon'>
                <PersonAddAltOutlinedIcon sx={{color:'rgb(92, 152, 242)'}} />
                <p>Guest allow</p>
               </div>,
    smokingAllow: <div className='facilities_info_icon'>
                    <SmokingRoomsOutlinedIcon sx={{color:'rgb(92, 152, 242)'}} />
                    <p>Smoke allow</p>
                  </div>,
    animalAllow:<div className='facilities_info_icon'>
                    <PetsOutlinedIcon sx={{color:'rgb(92, 152, 242)'}} />
                    <p>Animals allow</p>
                </div>
};
const SingleRoomInfo = ({data}:any) => {
    return (
        <div className="single_room_info">
        <h1 className={dmFont.className}>Room All Information</h1>
        <h3 className='room_price'>Per day price is <span>{data?.price}&#2547;</span> </h3>
        <Divider sx={{marginBottom:'20px'}} />
        <Grid container spacing={2}>
            <Grid item sm={6}>
            <div className="room_facilities_conditions">
                <h3 className={dmSansFont.className}>Facilities</h3>
                {data.comforts.map((comfort:any)=>(
                    <div className='facilities_main' key={comfort}>{comfortIconsMap[comfort]}</div>
                ))}
            </div>
            </Grid>
            <Grid item sm={6}>
                <div className="room_facilities_conditions">
                <h3 className={dmSansFont.className}>Conditions</h3>
                {data.conditions.map((condition:any)=>(
                    <div className='facilities_main' key={condition}>{conditionIconsMap[condition]}</div>
                ))}
                </div>
            </Grid>
        </Grid>
    </div>
    );
};

export default SingleRoomInfo;