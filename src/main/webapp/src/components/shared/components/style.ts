import {makeStyles, Theme} from "@material-ui/core/styles";


export const managerSectionStyles = makeStyles((theme: Theme) => ({
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: "row",
        flexWrap: 'wrap',
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            flexDirection: "column",
        }
    },
    form: {
        display: 'flex',
        width: '100%'
    },
    input: {
        width: '100%',
        borderRadius: 50,
    },
    iconButton: {
        padding: 10,
        color: theme.palette.grey.A200
    },
    paper: {
        border: `1px solid ${theme.palette.grey.A200}`,
        paddingLeft: '8px',
        flex: '6 6 auto',
        borderRadius: 50,
        marginRight: theme.spacing(3),
        order:1,
        [theme.breakpoints.down('xs')]: {
            order:2,
            marginRight: theme.spacing(0),
            marginBottom: theme.spacing(1)
        }
    },
    buttonAdd: {
        order: 2,
        flex: '1 1 auto',
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            order:1,
            marginRight: theme.spacing(0),
            marginBottom: theme.spacing(1)
        }
    },
}))

export const dataTableStyles = makeStyles((theme:Theme)=> ({
    paper: {
        backgroundColor: theme.palette.background.default,
        flex: '1 1 100%',
        display: 'flex',
        position: 'relative',
        justifyContent: 'flex-end',
        zIndex: 120,
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            justifyContent: 'center',
        }
    },
    iconButton: {
        marginRight: '24px',
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}))