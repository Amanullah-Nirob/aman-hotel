import { Box,styled } from '@mui/material';
import React from 'react';
import InputField from '../../../element/feilds/InputField/InputField';

type RoomSearchProps = {
    searchTerm: string;
    handleChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };

  
const MuiBox = styled(Box)(({ theme }) => ({
  marginRight:'15px',
     '.MuiFormControl-root':{
        width:'100%',
        '.MuiInputBase-root':{
            '&:before':{
              content:'none'
            },
        }
     }
}));

const RoomSearch: React.FC<RoomSearchProps> = ({searchTerm,handleChangeSearch}) => {
    return (
       <MuiBox className='roomSearch'>
       <InputField
        btnvariant='filled'
        name='searchbar'
        label='Search'
        size='small'
        value={searchTerm}
        onChange={handleChangeSearch}
        />
        </MuiBox>
    );
};

export default RoomSearch;