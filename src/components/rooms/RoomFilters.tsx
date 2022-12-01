import React, { useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import useFiltersQuery from '../../hooks/useFiltersQuery';
import { guestsLabelGet, initialState } from '../../utils/appUtils';
import { dmSansFont} from '../../utils/nextFont';
import Checkbox from '../checkBox/Checkbox';
import CheckBoxList from '../checkBox/CheckBoxList';
import DateOfStay from '../element/feilds/dateOfStayField/DateOfStay';
import PriceRange from '../element/feilds/priceRange/PriceRange';
import {Box,Paper,useMediaQuery} from '@mui/material'
import RoomsFilterList from './RoomsFilterList';
import GuestCount from '../menus/GuestCount';


const RoomFilters = ({filteredData}:any) => {
    const theme=useAppSelector(selectTheme)
    const { searchFilters, handleChangeFilter, handleResetSearchFilters } = useFiltersQuery();
    const [guestCountMenuAnchor, setGuestCountMenuAnchor] = useState<any | null>(null);
    const comforstFilter= filteredData?.map((filter:any)=>filter.comforts)
    const conditionFilter=filteredData?.map((filter:any)=>filter.conditions)
    const roomsTypeFilter=filteredData?.map((filter:any)=>filter.type)
    const data = { ...initialState, ...searchFilters };
     
    return (
        <div className='roomFilters'>
           <div className="filterTitle" style={{borderColor:theme==='light'?'rgb(233, 226, 226)':'rgb(68, 66, 66)'}}>
            <p className={dmSansFont.className}>Filter ({filteredData?.length})</p>
           </div>
           <RoomsFilterList data={data}  handleChange={handleChangeFilter}>
            {/* date filter */}
            <Box sx={{'.MuiPaper-root':{backgroundColor:'transparent'}}} className='filterDate'>
            <DateOfStay data={data} onChange={handleChangeFilter} />
            </Box>
            {/* guest filter */}
            <Paper elevation={0} className='guest_count' onClick={(e) => setGuestCountMenuAnchor(e.target)} 
                sx={{backgroundColor:theme==='light'?'#dddddd5e':'#000',padding:'9px 9px',marginRight:'10px',cursor:'pointer'}}>
                <p className={dmSansFont.className +' guestTitle'}>Guests</p>
                <div className="guestContent">
                <div className='guestMain'>{guestsLabelGet(data?.adults,data?.children,data?.babies)}</div>
                </div>
            </Paper>
            {/* Facilities */}
            <CheckBoxList title='Facilities' filteredData={comforstFilter}>
                <Checkbox label='Air conditioner' name='hasConditioner'  />
                <Checkbox label='Wi-Fi' name='hasWifi'/>
                <Checkbox label='Washing Machine' name='hasWashingMachine'  />
                <Checkbox label='Kitchen' name='hasKitchen' />
                <Checkbox label='Workplace' name='hasWorkSpace'/>
            </CheckBoxList> 
            {/* Conditions */}
            <CheckBoxList title='Conditions' filteredData={conditionFilter}>
                <Checkbox label='Guest Allow' name='guestAllow' />
                <Checkbox label='Smoking Allow' name='smokingAllow' />
                <Checkbox label='Animal Allow' name='animalAllow' />
            </CheckBoxList>   
            {/* Rooms Type =========> not yat */}
            <CheckBoxList title='Room Type' filteredData={roomsTypeFilter}>
                <Checkbox label='Standard' name='standard'/>
                <Checkbox label='Moderate' name='moderate'/>
                <Checkbox label='Deluxe' name='fancy'/>
                <Checkbox label='Suite' name='suite'/>
            </CheckBoxList>
            {/* price range */}
            <PriceRange
                label='Price range'
                name='price'
                onChange={handleChangeFilter}
                min={0}
                max={15000}
            />
            </RoomsFilterList>
            {/* guest count menu */}
            <GuestCount
                anchor={guestCountMenuAnchor}
                setAnchor={setGuestCountMenuAnchor}
                data={data}
                onChange={handleChangeFilter}
            ></GuestCount>
        </div>
    );
};

export default RoomFilters;