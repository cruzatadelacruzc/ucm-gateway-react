import React from 'react';
import {ButtonBase} from "@mui/material";
import {Link} from "react-router-dom";
import Logo from "../../components/logo";

const LogoSection = () => {
    return (
        <ButtonBase disableRipple component={Link} to="/">
            <Logo/>
        </ButtonBase>
    );
};

export default LogoSection;