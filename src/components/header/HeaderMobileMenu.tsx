import React from 'react';
import HeaderMenuItem from './HeaderMenuItem';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTheme, switchTheme } from '../../app/slices/theme/ThemeSlice';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LanguageIcon from '@mui/icons-material/Language';
import ListItem from '@mui/material/ListItem';
import { displayToast } from '../../app/slices/ToastSlice';

const HeaderMobileMenu = () => {
    const theme=useAppSelector(selectTheme)
    const dispatch=useAppDispatch()

    const handleDayModeChange = (_event: any) => {
        dispatch(switchTheme('light'))
    };
    const handleNightModeChange = (_event: any) => {
        dispatch(switchTheme('dark'))
    };

    const handleLanguageChange=(_event:any)=>{
        dispatch(  
            displayToast({ 
            title: `${_event.target.innerHTML}`, 
            message:'translation will be updated soon', type: "info", duration: 2000, positionVert: "top",
            positionHor: "left",
          }))
    }

    const LanguageListItemLink=(listItemText:string)=>{
       return <ListItem sx={{marginLeft:'30px',padding:'0'}}>{listItemText}</ListItem>
    }
    const menu = [
        {
          icon: theme==='light'?<WbSunnyIcon />:<DarkModeIcon />,
          title: `Display: ${theme==='light'?'Day Mode':'Night Mode'}`,
          items: [
            {
              title: "Day Mode",
              icon:<WbSunnyIcon />,
              action:handleDayModeChange
            },
            {
              title: "Night Mode",
              icon:<DarkModeIcon />,
              action:handleNightModeChange
            },
          ]
        },
        {
            icon: <LanguageIcon />,
            title: `English`,
            items: [
              {
                title: LanguageListItemLink('عربى'),
                icon:'',
                action:handleLanguageChange
              },
              {
                title: LanguageListItemLink("English"),
                icon:'',
                action:handleLanguageChange
              },
             
              {
                title:LanguageListItemLink('বাংলা'),
                icon:'',
                action:handleLanguageChange
              },
             
              {
                title: LanguageListItemLink('हिन्दी'),
                icon:'',
                action:handleLanguageChange
              },
              {
                title: LanguageListItemLink("日本語"),
                icon:'',
                action:handleLanguageChange
              },
            ]
          },
        {
            icon: <ElectricBoltIcon />,
            title: "Options",
            url:'/optins'
        },
    ];
    return(
        <div>{ menu.map((item, key) => <HeaderMenuItem key={key} item={item} />)}</div>
    )
};

export default HeaderMobileMenu;