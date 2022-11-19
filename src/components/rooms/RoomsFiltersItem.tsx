import React from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import {dmSansFont} from '../../utils/nextFont'

type RoomsFiltersItemProps = {
    title?: string;
    children: React.ReactNode;
};
  
const RoomsFiltersItem: React.FC<RoomsFiltersItemProps> = ({ title, children }) => {
  const theme=useAppSelector(selectTheme)
    return (
      <div className='filters_item' style={{borderColor:theme==='light'?'#ddd':'rgb(68, 66, 66)'}}>
          {title && <legend className='filters_item_title'><span className={dmSansFont.className}>{title}</span></legend>}
          {children}
      </div>
    );
  };
  
export default React.memo(RoomsFiltersItem);