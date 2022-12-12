import React from 'react';
import { MenuItem, MenuList } from '@mui/material';
import Link from 'next/link';
import Router  from 'next/router';

const CustomMenuLink = ({ children, href}:any) => {
    return (
        <MenuItem component={Link} href={href} className={`sidebar_menu_item ${Router.pathname === href || Router.asPath ===href?'active':''}
        ${Router.asPath ===href?'reactive':''}
        `}>
         {children}
        </MenuItem>
    );
};

export default CustomMenuLink;