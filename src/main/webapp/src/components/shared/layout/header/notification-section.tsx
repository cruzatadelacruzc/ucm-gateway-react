import React from 'react';
import {
    Avatar,
    Box,
    Button,
    ButtonBase,
    CardActions,
    ClickAwayListener,
    Divider,
    Grow,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Popper,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {Notifications} from "@mui/icons-material";
import PerfectScrollbar from 'react-perfect-scrollbar';
import MainCard from "../../components/main-card";
import {defaultValue, INotification} from "../../models/notifications";

const NotificationSection = () => {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));
    const positionSX = matchesXs ? 'top' : 'top right';
    /**
     * anchorRef is used on different components and specifying one type leads to other components throwing an error
     * */
    const anchorRef = React.useRef<HTMLDivElement>(null);

    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen)
    }

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current?.contains(event.target)) {
            return;
        }
        setOpen(false);
    };


    const notifications: Array<INotification> = [defaultValue]

    return (
        <div>
            <Box
                sx={{
                    ml: 2,
                    mr: 3,
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    }
                }}>
                <ButtonBase sx={{borderRadius: 12}}>
                    <Avatar
                        variant="rounded"
                        sx={{
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.secondary.light,
                            color: theme.palette.secondary.dark,
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                background: theme.palette.secondary.dark,
                                color: theme.palette.secondary.light,
                            }
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="inherit"
                    >
                        <Notifications/>
                    </Avatar>
                </ButtonBase>
            </Box>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [{
                        name: 'offset',
                        options: {
                            offset: [matchesXs ? 5 : 0, 20]
                        }
                    }]
                }}
            >
                {({TransitionProps}) => (
                    <Grow
                        {...TransitionProps}
                    >
                        <Box sx={{transformOrigin: positionSX}}>
                            <Paper>
                                <ClickAwayListener
                                    onClickAway={handleClose}>
                                    <MainCard elevation={16} boxShadow shadow={theme.shadows[16]}>
                                        <PerfectScrollbar
                                            style={{
                                                height: '100%',
                                                maxHeight: 'calc(100vh - 205px)',
                                                overflowX: 'hidden'
                                            }}
                                        >
                                            <List sx={{
                                                width: '100%',
                                                maxWidth: 350,
                                                py: 0,
                                                borderRadius: '10px',
                                                [theme.breakpoints.down('md')]: {
                                                    maxWidth: 300
                                                },
                                                '& .list-container': {
                                                    pl: 7
                                                }
                                            }}>
                                                {notifications.map(notification => (
                                                    <>
                                                        <ListItem
                                                            key={notification.id}
                                                            secondaryAction={notification.dateTime}
                                                        >
                                                            <ListItemAvatar>
                                                                <Avatar alt={notification.userName}
                                                                        src={notification.avatarUrl}/>
                                                            </ListItemAvatar>
                                                            <ListItemText
                                                                primary={notification.userName}
                                                                secondary={notification.content}
                                                            />
                                                        </ListItem>
                                                        <Divider variant="inset" component="li" />
                                                    </>
                                                ))
                                                }
                                            </List>
                                        </PerfectScrollbar>
                                        <CardActions sx={{p: 1.25, justifyContent: 'center'}}>
                                            <Button size="small" disableElevation>
                                                Mark as all read
                                            </Button>
                                        </CardActions>
                                    </MainCard>
                                </ClickAwayListener>
                            </Paper>
                        </Box>
                    </Grow>
                )}
            </Popper>

        </div>
    );
};

export default NotificationSection