import React from 'react';

type RoomsFiltersItemProps = {
    title?: string;
    children: React.ReactNode;
};
  
const RoomsFiltersItem: React.FC<RoomsFiltersItemProps> = ({ title, children }) => {
    return (
      <div className='filters_item'>
          {title && <legend className='filters_item_title'>{title}</legend>}
          {children}
      </div>
    );
  };
  
export default React.memo(RoomsFiltersItem);