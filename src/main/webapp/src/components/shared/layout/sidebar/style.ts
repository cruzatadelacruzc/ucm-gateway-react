import {Theme} from '@mui/material/styles';


import makeStyles from '@mui/styles/makeStyles';


export const sidebarStyles = makeStyles((theme: Theme, drawerWidth: number = 240) => ({
    linkIcon: {
        marginRight: theme.spacing(1),
        color: theme.palette.text.secondary + "99",
        transition: theme.transitions.create("color"),
        width: 24,
        display: "flex",
        justifyContent: "center",
    },
    linkTextActive: {
        color: theme.palette.text.primary,
    },
    nestedList: {
        paddingLeft: theme.spacing(2) + 30,
    },
    linkIconActive: {
        color: theme.palette.primary.main,
    },
    link: {
        textDecoration: "none",
        "&:hover, &:focus": {
            backgroundColor: theme.palette.background.paper,
        },
    },
    linkActive: {
        backgroundColor: theme.palette.error.light,
    },
    sectionTitle: {
        marginLeft: theme.spacing(4.5),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    linkText: {
        padding: 0,
        color: theme.palette.text.secondary + "CC",
        transition: theme.transitions.create(["opacity", "color"]),
        fontSize: 16,
    },
    linkTextHidden: {
        opacity: 0,
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(4),
        height: 1,
        backgroundColor: "#D8D8D880",
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 20,
        [theme.breakpoints.down('md')]: {
            width: drawerWidth,
        }
    },
    toolbar: {
        ...theme.mixins.toolbar,
        [theme.breakpoints.down('md')]: {
            display: 'none',
        }
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    headerIcon: {
        fontSize: 28,
        color: "rgba(255, 255, 255, 0.35)",
    },
    headerIconCollapse: {
        color: theme.palette.common.black,
    },
    mobileBackButton: {
        marginTop: theme.spacing(0.5),
        marginLeft: theme.spacing( 3),
        [theme.breakpoints.only("sm")]: {
            marginTop: theme.spacing(0.625),
        },
        [theme.breakpoints.up("md")]: {
            display: 'none',
        }
    }
}));