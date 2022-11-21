import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import {Checkbox as MuiCheckBox} from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {roboto,dmSansFont} from '../../utils/nextFont'
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
type ConvertFn = {
  target: {
    name: string;
    value: boolean;
  };
};

type CheckboxTypes = {
  label?: string;
  name: string;
  value?: string | boolean;
  onChange?: (cb: ConvertFn) => ConvertFn;
  filtereddatalength?:any
};

const Checkbox: React.FC<CheckboxTypes> = ({ label, name,value, onChange, filtereddatalength,...rest }) => {
  const theme=useAppSelector(selectTheme)
  const convertToDefEventParam = (name: string, value: boolean) => ({ 
    target: { 
      name,
      value,
    },
  });

 const filterDataLength=filtereddatalength?.filter((filter:any)=>filter.includes(name)).length

 
  
  return (
    <FormControlLabel sx={{width:'100%',marginLeft:'0',marginRight:'0',marginBottom:'5px','.MuiTypography-root':{width:'100%'}}} control={
    <MuiCheckBox 
     sx={{padding:'0',marginRight:'5px','& .MuiSvgIcon-root': { fontSize: 22 } }}
     icon={<CheckBoxOutlineBlankIcon sx={{stroke: theme==='light'?"#ffffff":'#000', }} />}
     checkedIcon={<CheckBoxIcon />}
     onChange={event => onChange && onChange(convertToDefEventParam(name, event.currentTarget.checked))} inputProps={{ 'aria-label': 'controlled' }} />} 
     label={
      <div className={roboto.className + " " + 'checkBoxLabel'} style={{ fontSize: '15px',fontWeight:'100 !important',color:theme==='light'?'#000':'#fff' }}>
         <p>{label}</p>
         <p>({filterDataLength})</p>

      </div>
       } 
     checked={!!value} name={name} value={value?.toString()} 
    {...rest} />
  );
};

export default React.memo(Checkbox);
