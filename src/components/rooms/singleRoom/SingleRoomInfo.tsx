import React from 'react';
import {Grid,Divider,Paper, Button} from '@mui/material'
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WifiIcon from '@mui/icons-material/Wifi';
import LocalLaundryServiceOutlinedIcon from '@mui/icons-material/LocalLaundryServiceOutlined';
import CountertopsOutlinedIcon from '@mui/icons-material/CountertopsOutlined';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import SmokingRoomsOutlinedIcon from '@mui/icons-material/SmokingRoomsOutlined';
import PetsOutlinedIcon from '@mui/icons-material/PetsOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { dmSansFont,dmFont,roboto } from '../../../utils/nextFont';
import { useAppSelector } from '../../../app/hooks';
import { selectTheme } from '../../../app/slices/theme/ThemeSlice';
import SingleRoomTitle from './singleRoomPart/SingleRoomTitle';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import PanToolAltOutlinedIcon from '@mui/icons-material/PanToolAltOutlined';
import Rating from '../../common/rating/Rating';

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
                        <p>Washing Machine</p>
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
    const theme=useAppSelector(selectTheme)
    
    return (
        <>
        <SingleRoomTitle data={data} theme={theme}></SingleRoomTitle>
        <Divider sx={{display:{sm:'none',sx:'block',marginTop:'35px'}}} />
        {/* description */}
        <Paper variant="outlined" className='singleRoomDescription'>
          <h1 className={dmSansFont.className}>Stays descriptions</h1>
          <Divider sx={{width:'130px'}} />
          <p>{data?.description}</p>
        </Paper>
        <Divider sx={{display:{sm:'none',sx:'block',marginTop:'35px'}}} />
       {/* Facilities */}
       <Paper variant="outlined" className='roomFacilities'>
         <div className='facilitiesTitle'>
            <h1 className={dmSansFont.className}>Facilities</h1>
            <p>About the room facilities and services</p>
            <Divider sx={{width:'130px'}} />
         </div>
         <div className="roomFacilitiesMain">
            {data?.comforts.map((comfort:any)=>(
                <div className='facilities_main' key={comfort}>{comfortIconsMap[comfort]}</div>
            ))}
         </div>
       </Paper>
       <Divider sx={{display:{sm:'none',sx:'block',marginTop:'35px'}}} />
       {/* Things to know */}
       <Paper variant="outlined"className='thingToKnow'>
       <h1 className={dmSansFont.className}>Things to know</h1>
        <Divider sx={{width:'130px'}} />
        <div className="Required_Main">
        <h2 className={dmSansFont.className}>Required Documents</h2>
            <div className="required-box">
            <FactCheckOutlinedIcon sx={{stroke: theme==='light'?"#f5f5f5":'#484848'}} />
            <p>Guests must submit NID / Passport photocopy</p>
            </div>
            <div className="required-box">
            <FactCheckOutlinedIcon sx={{stroke: theme==='light'?"#f5f5f5":'#484848'}} />
            <p>Guests must submit NID / Passport photocopy</p>
            </div>
        </div>
        <Divider sx={{width:'130px',marginTop:'15px'}} />
      {/* Required */}
        <div className="Required_Main Cancellation">
        <h2 className={dmSansFont.className}>Cancellation policy</h2>
            <div className="required-box">
            <InfoOutlinedIcon sx={{stroke: theme==='light'?"#f5f5f5":'#484848'}} />
            <p>If you cancel before 72 hours prior to booking time cancellation is free, and you will receive full refund.</p>
            </div>
            <div className="required-box">
            <InfoOutlinedIcon sx={{stroke: theme==='light'?"#f5f5f5":'#484848'}} />
            <p>If you cancel within 48 hours prior to booking time, there will be a 50% refund.</p>
            </div>
            <div className="required-box">
            <InfoOutlinedIcon sx={{stroke: theme==='light'?"#f5f5f5":'#484848'}} />
            <p>If you cancel within 24 hours prior to booking time, there will be not refund.</p>
            </div>
        </div>
        <Divider sx={{width:'130px',marginTop:'15px'}} />
        {/* Availability */}
        <div className="Availability">
            <h2 className={dmSansFont.className}>Availability</h2>
            <div className='Availability_box' style={{backgroundColor:theme==='light'?'rgb(239 239 239)':'#000'}}>
                <p>Check In time</p>
                <p>02:00 PM</p>
            </div>
            <div className='Availability_box'>
                <p>Check Out time</p>
                <p>12:00 PM</p>
            </div>
        </div>  
        <Divider sx={{width:'130px',marginTop:'15px'}} />
        {/* roomRules */}
        <div className='roomRules'>
         <div className='roomRulesTitle'>
            <h2 className={dmSansFont.className}>Space Rules</h2>
         </div>
         <div className="roomRulesMain">
         {data.conditions.map((condition:any)=>(
            <div key={condition}>{conditionIconsMap[condition]}</div>
         ))}
         </div>
       </div>
       <Divider sx={{width:'130px',marginTop:'15px'}} />
       {/* Special Note */}
       <div className="Special">
        <h2 className={dmSansFont.className}>Special Note</h2>
        <div className='specialNotsBox'>
            <PanToolAltOutlinedIcon sx={{stroke: theme==='light'?"#f5f5f5":'#484848',transform: 'rotate(90deg)'}}/>
            <p>Only Registered Guests</p>
        </div>
        <div className='specialNotsBox'>
            <PanToolAltOutlinedIcon sx={{stroke: theme==='light'?"#f5f5f5":'#484848',transform: 'rotate(90deg)'}}/>
            <p>Furniture Must Be Kept Back In Place</p>
        </div>
        <div className='specialNotsBox'>
            <PanToolAltOutlinedIcon sx={{stroke: theme==='light'?"#f5f5f5":'#484848',transform: 'rotate(90deg)'}}/>
            <p>Minimal Sound Pollution</p>
        </div>
        <div className='specialNotsBox'>
            <PanToolAltOutlinedIcon sx={{stroke: theme==='light'?"#f5f5f5":'#484848',transform: 'rotate(90deg)'}}/>
            <p>No Indecent Behavior</p>
        </div>
       </div>
       </Paper>
        </>
     
    );
};

export default SingleRoomInfo;