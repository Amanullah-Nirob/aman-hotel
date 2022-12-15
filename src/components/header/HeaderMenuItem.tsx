import React, { useState } from "react";
import { hasChildren } from '../shared/utils/menuutils';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Link from 'next/link'
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import {Collapse,Box} from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useAppSelector } from "../../app/hooks";
import { selectTheme } from "../../app/slices/theme/ThemeSlice";
import ListItemButton from '@mui/material/ListItemButton';

const HeaderMenuItem = ({item}:any) => {
    const Component = hasChildren(item) ? MultiLevel : SingleLevel;
    return <Component item={item} />;
};


const SingleLevel = ({ item }:any) => {
    return (
        <ListItemButton
         sx={{padding:'6px 13px','>.MuiSvgIcon-root':{marginRight:'10px'}}} >
            {item.icon}
            <span style={{fontSize:'15px'}}>{item.title}</span>
        </ListItemButton>
    );
};


const MultiLevel = ({ item }:any) => {
    const theme=useAppSelector(selectTheme)
    const { items: children } = item;
    const [open, setOpen] = useState(false);
    const handleClick = () => {
      setOpen((prev) => !prev);
    };
  
    return (
      <React.Fragment>
        <ListItemButton onClick={handleClick} sx={{padding:'6px 13px','>.MuiSvgIcon-root':{marginRight:'10px'}}}>
           {item.icon}
         <div style={{display:'flex',justifyContent:'space-between',width:'100%'}} >
         <span style={{fontSize:'15px',lineHeight:'27px'}}>{item.title}</span>
         <Box sx={{'>.MuiSvgIcon-root':{fontSize:'22px',transform:'translate(0px, 3px)'}}}>
            {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>
         </div>
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit sx={{backgroundColor:theme==='light'?'#ddd':'#202020',padding:'4px 0'}}>
          <List component="div" disablePadding>
            {children.map((child:any, key:any) => (
               <div onClick={(_event)=>child.action(_event)} key={key}>
                <HeaderMenuItem item={child} />
                </div>
            ))}
          </List>
        </Collapse>
      </React.Fragment>
    );
};
export default HeaderMenuItem;