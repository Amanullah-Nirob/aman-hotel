import React, { PropsWithChildren, ReactElement } from 'react';
import { useAppSelector } from '../../app/hooks';
import { selectTheme } from '../../app/slices/theme/ThemeSlice';
import RoomsFiltersItem from './RoomsFiltersItem';

type RoomsFiltersListProps = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    data: { [key: string]: any };
    children: React.ReactNode;
    filteredData:[]
};
type FilterItemProps = {
    name: string;
    title?: string;
    data?: {
      [key: string]: any;
    };
    value?: string;
    error?: string;
    type?: string;
    props?: {
      [key: string]: any;
    };
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: React.ChangeEvent<HTMLInputElement>) => void; 
};


const RoomsFilterList: React.FC<RoomsFiltersListProps>  = ({ handleChange, data, children,filteredData }) => {
     const theme=useAppSelector(selectTheme)
    const clonedElements = React.Children.map(children, child => {
        const item = child as ReactElement<PropsWithChildren<FilterItemProps>>;
        const childType = typeof item;
        
        let config = {};
        if (
          childType === 'object' ||
          (childType === 'function' && item.props.type !== 'submit' && item.props.type !== 'button')
        ) {
          config = {
            ...item.props,
            data,
            filteredData:filteredData,
            onChange: handleChange,
            value: data[item.props.name],
          };
        }
    
        return <RoomsFiltersItem title={item.props.title}>{React.cloneElement(item, config)}</RoomsFiltersItem>;
      });

     return <form className='filters_form' style={{borderColor:theme==='light'?'#ddd':'rgb(68, 66, 66)'}}>{clonedElements}</form>;
};

export default React.memo(RoomsFilterList);