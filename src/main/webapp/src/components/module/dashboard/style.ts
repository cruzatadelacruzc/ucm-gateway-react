import {Theme} from "@mui/material/styles";

import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';


export const formUpdateStyles = makeStyles((theme: Theme) => createStyles({
    form_group: {
        display: "flex",
        flexDirection: "row",
        flexWrap: 'wrap',
        [theme.breakpoints.down('sm')]: {
            flexDirection: "column",
        }
    },
    input: {
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(3),
        flex: '2 2 10em',
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(1),
            marginRight: theme.spacing(0),
        },
        [theme.breakpoints.down('md')]: {
            flex: '1 1 auto'
        }
    },
    inputSM: {
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(3),
        flex: '1 1 5em',
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(1),
            marginRight: theme.spacing(0),
        },
        [theme.breakpoints.down('md')]: {
            flex: '1 1 auto'
        }
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-start",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            flexDirection: "column",
        }
    },
    button: {
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            marginRight: theme.spacing(0),
            marginBottom: theme.spacing(1)
        }
    }
}));

export const detailsStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        ...theme.typography.body2,
        '& > :not(style) + :not(style)': {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
    },
    wrapDivider: {
        display: 'flex'
    },
    order1: {
        order: 1,
        flex: '1 1 auto'
    },
    order2: {
        order: 2,
        flex: '1 1 auto'
    },
    order3: {
        order: 3,
        flex: '1 1 auto'
    },
    cover: {
        maxWidth: 255,
        maxHeight: 255
    },
    data_row: {
        display: "flex",
        flexDirection: "row",
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            flexDirection: "column",
        }
    },
    data_column: {
        display: "flex",
        flex: '1 1 10em',
        flexDirection: "column",
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(1),
            marginRight: theme.spacing(0),
        }
    },
    data_cell: {
        flex: '1 1 4em',
        [theme.breakpoints.down('sm')]: {
            marginBottom: theme.spacing(1),
            marginRight: theme.spacing(0),
        },
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-start",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            flexDirection: "column",
        }
    },
    button: {
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('sm')]: {
            width: "100%",
            marginRight: theme.spacing(0),
            marginBottom: theme.spacing(1)
        }
    }
}));


