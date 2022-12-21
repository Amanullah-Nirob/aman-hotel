import React from 'react';
import { Box, styled,SelectProps as MuiSelectProps, useMediaQuery } from '@mui/material';
import SelectField, { OptionsItemType } from '../../../element/feilds/selectField/SelectField';

type RoomsDisplayCountProps = MuiSelectProps & {
    count: number;
    setCount: (e: any) => void;
    options: OptionsItemType[];
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
const RoomDisplayShow: React.FC<RoomsDisplayCountProps>  = ({ count, setCount, options }) => {
    const mobileMatches = useMediaQuery('(max-width:600px)');
    return (
        <MuiBox className='roomDisplay'>
            <SelectField
                style={{ minWidth: mobileMatches?'100px':'140px' }}
                name='pageSize'
                autoWidth={true}
                label='Display by'
                value={String(count)}
                onChange={e => setCount(e)}
                options={options}
            />
        </MuiBox>
    );
};

export default RoomDisplayShow;