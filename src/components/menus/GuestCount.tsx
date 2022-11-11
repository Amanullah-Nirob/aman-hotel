import React from 'react';
import { ListItemIcon, MenuItem,Avatar } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import Menu from '../../utils/Menu';
import GuestsCounter from '../element/guests/GuestsCounter';


const GuestCount = ({anchor,setAnchor,data,onChange}:any) => {

    return (
        <Menu
          menuAnchor={anchor}
          setMenuAnchor={setAnchor}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        >
        <GuestsCounter data={data} onChange={onChange} />
        </Menu>
    );
};

export default GuestCount;