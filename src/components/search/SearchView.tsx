import React from 'react';

const SearchView = ({room}:any) => {
    console.log(room);
    return (
        <div>
            <p>{room?.price}</p>
        </div>
    );
};

export default SearchView;