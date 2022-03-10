import React from 'react';
import {
    Avatar,
    Box,
    Chip,
    ClickAwayListener,
    Divider,
    Grow,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Typography,
    useTheme
} from '@mui/material';
import {
    BallotOutlined,
    DashboardOutlined,
    LoginOutlined,
    LogoutOutlined,
    ManageAccountsOutlined,
    Settings
} from '@mui/icons-material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate} from 'react-router-dom';
import {useSelector} from "react-redux";
import {IRootState} from "../../reducer";
import {getLoginUrl} from "../../util/url-util";
import MainCard from "../../components/main-card";

export interface IProfile {
    anchorEl: HTMLElement | null,
    menuId: string,
    isMenuOpen: boolean,
    handleMenuClose: () => void
}

export default function ProfileSection() {
    const {isAuthenticated, account} = useSelector((states: IRootState) => states.auth);
    const {t} = useTranslation(['common']);
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const [selectedIndex, setSelectedIndex] = React.useState(-1);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current?.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const handleListItemClick = (event, index, route = '') => {
        setSelectedIndex(index);
        handleClose(event);

        if (route && route !== '') {
            navigate(route);
        }
    };

    const PrivateMenu = function () {
        return (
            <div>
                {/*<MenuItem component={RouterLink} to={"profile"}*/}
                {/*          className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>*/}
                {/*    <AccountCircleOutlinedIcon className={classes.profileMenuIcon}/>*/}
                {/*    {t('common:profile')}*/}
                {/*</MenuItem>*/}
                {/*<MenuItem component={RouterLink} to={"dashboard"}*/}
                {/*          className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>*/}
                {/*    <DashboardOutlined className={classes.profileMenuIcon}/>*/}
                {/*    {t('common:dashboard')}*/}
                {/*</MenuItem>*/}
                <ListItemButton
                    selected={selectedIndex === 1}
                    onClick={(event) => handleListItemClick(event, 1, '/profile')}
                >
                    <ListItemIcon>
                        <ManageAccountsOutlined/>
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="body2">{t('profile')}</Typography>}
                    >
                    </ListItemText>
                </ListItemButton>
                {location.pathname !== '/dashboard' && <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2, '/dashboard')}
                >
                    <ListItemIcon>
                        <DashboardOutlined/>
                    </ListItemIcon>
                    <ListItemText
                        primary={<Typography variant="body2">{t('dashboard')}</Typography>}
                    >
                    </ListItemText>
                </ListItemButton>
                }
            </div>
        )
    }

    return (
        // <Menu
        //     id={props.menuId}
        //     open={props.isMenuOpen}
        //     anchorEl={props.anchorEl}
        //     onClose={props.handleMenuClose}
        //     className={classes.headerMenu}
        //     classes={{paper: classes.profileMenu}}
        //     disableAutoFocusItem
        // >
        //     <div className={classes.profileMenuUser}>
        //         <Typography variant='overline' display='block'>
        //             {account.login ? account.login : t('common:anonymous')}
        //         </Typography>
        //     </div>
        //     <MenuItem component={RouterLink} to={"/"}
        //               className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>
        //         <BallotOutlined className={classes.profileMenuIcon}/>
        //         {t('common:directory')}
        //     </MenuItem>
        //     {isAuthenticated && <PrivateMenu/>}
        //     <LogInOut/>
        // </Menu>
        <>
            <Chip
                variant="outlined"
                ref={anchorRef}
                aria-haspopup="true"
                color="primary"
                onClick={handleToggle}
                sx={{
                    height: '48px',
                    alignItems: 'center',
                    borderRadius: '27px',
                    transition: 'all .2s ease-in-out',
                    borderColor: theme.palette.primary.light,
                    backgroundColor: theme.palette.primary.light,
                    '&[aria-controls="menu-list-grow"], &:hover': {
                        borderColor: theme.palette.primary.main,
                        background: `${theme.palette.primary.main}!important`,
                        color: theme.palette.primary.light,
                        '& svg': {
                            stroke: theme.palette.primary.light
                        }
                    },
                    '& .MuiChip-label': {
                        lineHeight: 0
                    }
                }}
                icon={
                    <Avatar
                        alt={account.login ? account.login : t('common:anonymous')}
                        sx={{
                            ...theme.typography.mediumAvatar,
                            margin: '8px 0 8px 8px !important',
                            cursor: 'pointer'
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        color="inherit"
                    />
                }
                label={<Settings/>}
                aria-controls={open ? 'menu-list-grow' : undefined}
            />
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 14]
                            }
                        }
                    ]
                }}
            >
                {({TransitionProps}) => (
                    <Grow  {...TransitionProps}>
                        <Box sx={{transformOrigin: '0 0 0'}}>
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MainCard elevation={16} boxShadow shadow={theme.shadows[16]}>
                                        <PerfectScrollbar style={{
                                            height: '100%',
                                            maxHeight: 'calc(100vh - 250px)',
                                            overflowX: 'hidden'
                                        }}>
                                            <Box sx={{p: 2}}>
                                                <Box sx={{
                                                    bgcolor: theme.palette.primary.light,
                                                    textAlign: 'center',
                                                    py:1
                                                }}>
                                                <Typography  variant='subtitle1' display='block'>
                                                    {account.login ? account.login : t('common:anonymous')}
                                                </Typography>
                                                </Box>
                                                <Divider />
                                                <List
                                                    component="nav"
                                                    sx={{
                                                        width: '100%',
                                                        maxWidth: 300,
                                                        minWidth: 300,
                                                        backgroundColor: theme.palette.background.paper,
                                                        borderRadius: '10px',
                                                        [theme.breakpoints.down('md')]: {
                                                            minWidth: '100%'
                                                        }
                                                    }}
                                                >
                                                    {location.pathname !== '/' && <ListItemButton
                                                        selected={selectedIndex === 0}
                                                        onClick={(event) => handleListItemClick(event, 0, '/')}
                                                    >
                                                        <ListItemIcon>
                                                            <BallotOutlined/>
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={<Typography
                                                                variant="body2">{t('common:directory')}</Typography>}/>
                                                    </ListItemButton>}

                                                    {/*{Private Menu*/}
                                                    {isAuthenticated && <PrivateMenu/>}

                                                    {/* Logout Menu*/}
                                                    {isAuthenticated
                                                        ?
                                                        <ListItemButton
                                                            selected={selectedIndex === 3}
                                                            onClick={(event) => handleListItemClick(event, 3, '/logout')}
                                                        >
                                                            <ListItemIcon>
                                                                <LogoutOutlined/>
                                                            </ListItemIcon>
                                                            <ListItemText primary={<Typography
                                                                variant="body2">{t('log_out')}</Typography>}/>
                                                        </ListItemButton>
                                                        :
                                                        <ListItemButton selected={selectedIndex === 3}
                                                                        href={getLoginUrl()} component='a'>
                                                            <ListItemIcon>
                                                                <LoginOutlined/>
                                                            </ListItemIcon>
                                                            <ListItemText primary={<Typography
                                                                variant="body2">{t('log_in')}</Typography>}/>
                                                        </ListItemButton>
                                                    }
                                                </List>
                                            </Box>
                                        </PerfectScrollbar>
                                    </MainCard>
                                </ClickAwayListener>
                            </Paper>
                        </Box>
                    </Grow>
                )}
            </Popper>
        </>
    );
}
