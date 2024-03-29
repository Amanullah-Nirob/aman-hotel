import { Box ,styled,useMediaQuery} from '@mui/material';
import React from 'react';
import SelectField from '../../../element/feilds/selectField/SelectField';

const roomsSortArray = [
    { name: 'Descending', value: { path: 'roomNumber', order: 'desc' } },
    { name: 'Ascending', value: { path: 'roomNumber', order: 'asc' } },
    { name: 'Price: High to Low', value: { path: 'price', order: 'desc' } },
    { name: 'Price: Low to High', value: { path: 'price', order: 'asc' } },
    { name: 'Popular', value: { path: 'countReviews', order: 'desc' } },
    { name: 'High rating', value: { path: 'rate', order: 'desc' } },
  ];
type RoomsSortProps = {
    sortBy: { path: string; order: 'asc' | 'desc' };
    onSort: (event: any) => void;
};
const MuiBox = styled(Box)(({ theme }) => ({
    '.MuiFormControl-root':{
       width:'100%',
       '.MuiInputBase-root':{
           '&:before':{
             content:'none'
           },
       }
    }
}));

const RoomSort:React.FC<RoomsSortProps> = ({ sortBy, onSort }) => {
    const mobileMatches = useMediaQuery('(max-width:600px)');
    return (
        <MuiBox className='roomSort' sx={{marginRight:{sm:'14px',xs:'4px'}}}>
        <SelectField
            name='roomSort' 
            style={{ minWidth: mobileMatches?'130px':'200px' }}
            label='Sort'
            value={JSON.stringify(sortBy)}
            onChange={onSort}
            options={roomsSortArray}
        />
        </MuiBox>
      
    );
};

export default RoomSort;