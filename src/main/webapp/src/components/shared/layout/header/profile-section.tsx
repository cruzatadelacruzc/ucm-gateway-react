import React from 'react';
import {
    Avatar,
    Box,
    Chip,
    ClickAwayListener,
    Divider,
    Grow,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Popper,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import {
    BallotOutlined,
    DashboardOutlined,
    LoginOutlined,
    LogoutOutlined,
    ManageAccountsOutlined,
    MoreVert,
    Settings
} from '@mui/icons-material';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {useTranslation} from 'react-i18next';
import {useLocation, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../reducer";
import {getLoginUrl} from "../../util/url-util";
import MainCard from "../../components/main-card";
import {menuOpen} from "../../reducer/customization.reducer";

export interface IProfile {
    anchorEl: HTMLElement | null,
    menuId: string,
    isMenuOpen: boolean,
    handleMenuClose: () => void
}

export default function ProfileSection() {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const DASHBOARD_ROUTE = '/dashboard';
    const {t} = useTranslation(['common']);
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLDivElement>(null);
    const displaySM = useMediaQuery(theme.breakpoints.down('sm'));
    const [selectedIndex, setSelectedIndex] = React.useState(-1);
    const account = useSelector((states: IRootState) => states.auth.account);
    const isAuthenticated = useSelector((states: IRootState) => states.auth.isAuthenticated);

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

        if ( route === DASHBOARD_ROUTE) {
            dispatch(menuOpen('dashboard'));
        }
        if (route && route !== '') {
            navigate(route, { replace: true });
        }
    };

    const PrivateMenu = function () {
        return (
            <div>
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
                {!location.pathname.includes(DASHBOARD_ROUTE) && <ListItemButton
                    selected={selectedIndex === 2}
                    onClick={(event) => handleListItemClick(event, 2, DASHBOARD_ROUTE)}
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
        <>
            {displaySM ?
                <IconButton onClick={handleToggle}>
                    <Avatar
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        sx={{width: 15, backgroundColor: '#ffff'}}
                    >
                        <MoreVert sx={{color: theme.palette.grey["700"]}}/>
                    </Avatar>
                </IconButton>
                :
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
                        },

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
            }
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
                            <Paper
                            sx={{
                                '&:before': {
                                    content: '""',
                                    display: 'block',
                                    position: 'absolute',
                                    top: 0,
                                    right: 15,
                                    [theme.breakpoints.down('sm')]: {
                                        right: 8,
                                    },
                                    width: 10,
                                    height: 10,
                                    bgcolor: 'background.paper',
                                    transform: 'translateY(-50%) rotate(45deg)',
                                    zIndex: 0,
                                }
                            }}
                            >
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
