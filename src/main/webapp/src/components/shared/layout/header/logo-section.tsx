import React from 'react';
import {ButtonBase} from "@mui/material";
import {Link} from "react-router-dom";
import SvgLogo from "../../components/svg-logo";

const LogoSection = () => {
    return (
        <ButtonBase disableRipple component={Link} to="/dashboard">
            <SvgLogo sx={{fontSize: '3.5rem'}}/>
        </ButtonBase>
    );
};

export default LogoSection;