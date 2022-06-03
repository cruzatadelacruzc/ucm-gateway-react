import {Theme} from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {indigo} from '@mui/material/colors';
// Card
export const cardStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    cover: {
      maxWidth: 255,
      maxHeight: 255
    },
    content: {
      padding: theme.spacing(2),
    },
  })
);


// Header
export const headerStyles = makeStyles((theme: Theme) => ({
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
  }
}));
