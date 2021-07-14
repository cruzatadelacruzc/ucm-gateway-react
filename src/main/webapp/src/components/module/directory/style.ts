import { Badge } from '@material-ui/core';
import { Theme, withStyles, createStyles, makeStyles } from '@material-ui/core/styles';
import { indigo } from '@material-ui/core/colors';
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
  appBar: {
    backgroundColor: '#fff',
    display: 'flex',
    justifyContent: 'flex-start',
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
