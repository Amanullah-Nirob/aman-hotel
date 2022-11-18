import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import useFiltersQuery from '../../hooks/useFiltersQuery';
import { dmSansFont} from '../../utils/nextFont';
import Checkbox from '../checkBox/Checkbox';
import CheckBoxList from '../checkBox/CheckBoxList';
import RoomsFilterList from './RoomsFilterList';

const RoomFilters = ({filteredData}:any) => {
   const theme=useAppSelector(selectTheme)
   const { searchFilters, handleChangeFilter, handleResetSearchFilters } = useFiltersQuery();

   
    return (
        <div className='roomFilters'>
           <div className="filterTitle" style={{borderColor:theme==='light'?'rgb(233, 226, 226)':'rgb(68, 66, 66)'}}>
            <p className={dmSansFont.className}>Filter ({filteredData?.length})</p>
            <RoomsFilterList data={searchFilters} handleChange={handleChangeFilter}>
            <CheckBoxList>
            <Checkbox label='Wi-Fi' name='hasWifi' />
            </CheckBoxList>    

            </RoomsFilterList>
           </div>
        </div>
    );
};

export default RoomFilters;