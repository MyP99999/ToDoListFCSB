import React from 'react';

const Header = ({ onSearchChange }) => {


    return (

        <input
            type="text"
            className="p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent w-1/2"
            placeholder="Search todo..."
            onChange={e => onSearchChange(e.target.value)}
        />
    )
}

export default Header;
