import React from 'react';
import useTheme from "@mui/material/styles/useTheme";

const Logo = () => {
    const theme =  useTheme();
    return ( <img alt='logo' src='./oficial-logo.svg' style={{width: theme.spacing(7), height: theme.spacing(7)}}/>);
};

export default Logo;