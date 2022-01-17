import React from 'react';
import classes from './Header.module.css';
const Header =(props)=>{
    return(
    <React.Fragment>
        <header className={classes.header}>
            <h1 className={classes.contain}>MOCSYAM</h1>
            </header>
    </React.Fragment>
    )
};
export default Header;