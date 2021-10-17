import {Badge} from '@material-ui/core';
import {createStyles, makeStyles, Theme, withStyles} from '@material-ui/core/styles';
import {indigo} from '@material-ui/core/colors';
// Card
export const cardStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    cover: {
      width: 151,
    },
    content: {
      padding: theme.spacing(2),
    },
  })
);

// Badge of card type: employee,student
export const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
    },
  })
)(Badge);

// Header
export const headerStyles = makeStyles((theme: Theme) => ({
  grow: {
    flexGrow: 1,
    marginRight: theme.spacing(5),
    [theme.breakpoints.down('xs')]: {
      marginRight: theme.spacing(0),
    },
  },
  appBar: {
    backgroundColor: '#fff',
  },
  paper: {
    padding: '2px 4px',
    display: 'flex',
    alignSelf: 'center',
    width: '100%',
    borderRadius: 50,
  },
  paperBorder: {
    border: '1px solid #e0e2e6',
  },
  form: {
    width: '100%',
    display: 'flex',
  },
  input: {
    marginLeft: theme.spacing(1),
    borderRadius: 50,
    width: '100%',
  },
  iconButton: {
    padding: 10,
  },
  link: {
    textDecoration: 'none',
    color: 'inherit',
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  avatar: {
    color: theme.palette.getContrastText(indigo[500]),
    backgroundColor: indigo[500],
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
  logo: {
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  }
}));
