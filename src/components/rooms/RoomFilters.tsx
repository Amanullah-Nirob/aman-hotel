import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectTestBox } from '../../app/slices/test';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import useFiltersQuery from '../../hooks/useFiltersQuery';
import { dmSansFont} from '../../utils/nextFont';
import Checkbox from '../checkBox/Checkbox';
import CheckBoxList from '../checkBox/CheckBoxList';
import PriceRange from '../element/feilds/priceRange/PriceRange';

import RoomsFilterList from './RoomsFilterList';

const RoomFilters = ({filteredData}:any) => {
   const theme=useAppSelector(selectTheme)
   const { searchFilters, handleChangeFilter, handleResetSearchFilters } = useFiltersQuery();
   

    
    return (
        <div className='roomFilters'>
           <div className="filterTitle" style={{borderColor:theme==='light'?'rgb(233, 226, 226)':'rgb(68, 66, 66)'}}>
            <p className={dmSansFont.className}>Filter ({filteredData?.length})</p>
           </div>
           <RoomsFilterList data={searchFilters} filteredData={filteredData} handleChange={handleChangeFilter}>
            <CheckBoxList title='Facilities'>
            <Checkbox label='Wi-Fi' name='hasWifi' />
            <Checkbox label='Air conditioner' name='hasConditioner' />
            <Checkbox label='Workplace' name='hasWorkSpace' />
            </CheckBoxList> 

            <CheckBoxList title='Conditions'>
            <Checkbox label='pets Allow' name='canPets' />
            <Checkbox label='smoke permission' name='canSmoke' />
            <Checkbox label='guest allow' name='canInvite' />
            </CheckBoxList>    
            <CheckBoxList title='Availability'>
            <Checkbox label='corridor' name='hasWideCorridor'/>
            <Checkbox label='Helper for the Disabled' name='hasDisabledAssistant'/>
            </CheckBoxList>

         <PriceRange
          label='Price range'
          name='price'
          data={searchFilters}
          onChange={handleChangeFilter}
          min={0}
          max={15000}
        />
            </RoomsFilterList>
        </div>
    );
};

export default RoomFilters;