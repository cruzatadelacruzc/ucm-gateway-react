import React from 'react';
import Header from '../../shared/layout/header';
import Sidebar from "../../shared/layout/sidebar";
import {Outlet} from 'react-router-dom'
import {styled, useTheme} from "@mui/material/styles";
import {AppBar, Box, CssBaseline, Toolbar, useMediaQuery, useScrollTrigger} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../shared/reducer";
import {setMenu} from "../../shared/reducer/customization.reducer";
import {drawerWidth} from "../../../config/constants";

const Main = styled('main', {shouldForwardProp: open => open !== 'open'})<{open: boolean}>(({ theme, open }) => ({
    flexGrow: 1,
    width: '100%',
    borderRadius: 8,
    padding: '20px',
    marginTop: '88px',
    marginRight: '20px',
    minHeight: 'calc(100vh - 88px)',
    backgroundColor: theme.palette.primary.main,
    ...(!open && {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
        [theme.breakpoints.up('md')]: {
            marginLeft: -(drawerWidth - 20),
            width: `calc(100% - ${drawerWidth}px)`
        },
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px',
            width: `calc(100% - ${drawerWidth}px)`,
            padding: '16px',
            marginRight: '10px'
        }
        }),
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        width: `calc(100% - ${drawerWidth}px)`,
        [theme.breakpoints.down('md')]: {
            marginLeft: '20px'
        },
        [theme.breakpoints.down('sm')]: {
            marginLeft: '10px'
        }
    })
}))
const Dashboard = () => {

    const theme = useTheme();
    const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));

    // Handle left drawer
    const dispatch = useDispatch();
    const leftDrawerOpened = useSelector((state: IRootState) => state.customization.opened);
    const handleLeftDrawerToggle = () => {
        dispatch(setMenu(!leftDrawerOpened));
    };

    React.useEffect(() => {
        dispatch(setMenu(!matchDownMd));
    }, [matchDownMd]); // eslint-disable-line react-hooks/exhaustive-deps

    const trigger = useScrollTrigger({
        disableHysteresis: true,
    });

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            {/* header */}
            <AppBar
                enableColorOnDark
                position="fixed"
                color="inherit"
                elevation={trigger ? 5 : 0}
                sx={{
                    bgcolor: theme.palette.background.default,
                    transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
                }}
            >
                <Toolbar>
                    <Header toggleSidebar={handleLeftDrawerToggle} isSidebarOpened={leftDrawerOpened}/>
                </Toolbar>
            </AppBar>

            {/* drawer */}
            <Sidebar toggleSidebar={handleLeftDrawerToggle} isSidebarOpened={leftDrawerOpened}/>

            {/* main content */}
            <Main theme={theme} open={leftDrawerOpened}>
                {/* breadcrumb */}
                {/*<Breadcrumbs separator={IconChevronRight} navigation={navigation} icon title rightAlign/>*/}
                <Outlet/>
            </Main>
        </Box>
    )
};

export default Dashboard;
