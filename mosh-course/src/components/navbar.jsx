import React, { Component } from 'react';

function Navbar({totalCounters}){
    return (<nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">Navbar <span>{totalCounters}</span></a>
    </nav>);
    
}
 
export default Navbar;