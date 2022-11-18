import React from 'react';
import Link from 'next/link';
import { dmFont, dmSansFont } from '../../utils/nextFont';
const BreadCrumb = ({ breacrumb, layout }:any) => {
    
    return (
        <div>
                <ul className="breadcrumb">
                    {breacrumb.map((item:any, index:any) => {
                        if (!item.url) {
                            return <li className={dmSansFont.className} key={index}>{item.text}</li>;
                        } else {
                            return (
                                <li key={item.text} className={dmSansFont.className}>
                                    <Link style={{textDecoration:'none',color:'#878787'}} href={item.url}>{item.text}</Link>
                                </li>
                            );
                        }
                    })}
                </ul>
        </div>
    );
};

export default BreadCrumb;
