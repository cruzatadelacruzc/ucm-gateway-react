import {makeStyles, Theme} from '@material-ui/core/styles';
import {indigo} from '@material-ui/core/colors';

const drawerWidth = 240;
  export const headerStyles = makeStyles((theme: Theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  appBar: {
    // backgroundColor: '#fff',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  hide: {
    display: 'none',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  headerMenuButton: {
      marginLeft: theme.spacing(2),
      padding: theme.spacing(0.5),
    },
  headerMenuButtonCollapse: {
      marginRight: theme.spacing(2),
    },
  headerIcon: {
      fontSize: 28,
      color: "rgba(255, 255, 255, 0.35)",
  },
  headerIconCollapse: {
      color: "white",
  },
  toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
  content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  headerMenu: {
    marginTop: theme.spacing(7),
  },
  profileMenu: {
    minWidth: 256,
    maxWidth: 280,
  },
  profileMenuItem: {
    color: theme.palette.text.hint,
  },
  headerMenuItem: {
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.light,
      color: 'white',
    },
  },
  profileMenuIcon: {
    marginRight: theme.spacing(2),
    color: theme.palette.text.hint,
  },
  avatar: {
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
  },
  profileMenuUser: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'column',
    padding: theme.spacing(2),
  },
}));

