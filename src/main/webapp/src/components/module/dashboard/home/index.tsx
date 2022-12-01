import React from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import styled from "@mui/material/styles/styled";
import {
    Business as BusinessIcon,
    ContactPhone as ContactPhoneIcon,
    Engineering as EngineeringIcon,
    School as SchoolIcon
} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import {useNavigate} from "react-router-dom";

const Item = styled(Paper)(({theme}) => ({
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    cursor: "pointer",
    backgroundColor: theme.palette.secondary.light,
    padding: theme.spacing(1),
    transition: 'all .3s ease-in-out',
    color: theme.palette.secondary.contrastText,
    '&:hover': {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.background.default
    },
}));

const DashboardPage = () => {
    const navigate = useNavigate();
    const goTo = (route: string) => {
        route && route != '' && navigate(route, {replace: true})
    }
    return (
        <>
            <Stack direction={{xs: 'column', sm: 'row'}} spacing={2}>
                <Item onClick={() => goTo('/dashboard/student')}>
                    <SchoolIcon sx={{fontSize: {xs: "3.75rem", lg: "6rem"}}}/>
                    <Typography variant="h3">264435</Typography>
                </Item>
                <Item onClick={() => goTo('/dashboard/employee')}>
                    <EngineeringIcon sx={{fontSize: {xs: "3.75rem", lg: "6rem"}}}/>
                    <Typography variant="h3">346782</Typography>
                </Item>
                <Item onClick={() => goTo('/dashboard/phone')}>
                    <ContactPhoneIcon sx={{fontSize: {xs: "3.75rem", lg: "6rem"}}}/>
                    <Typography variant="h2">26535</Typography>
                </Item>
                <Item onClick={() => goTo('/dashboard/workplace')}>
                    <BusinessIcon sx={{fontSize: {xs: "3.75rem", lg: "6rem"}}}/>
                    <Typography variant="h2">26589</Typography>
                </Item>
            </Stack>
        </>
  );
};

export default DashboardPage;
