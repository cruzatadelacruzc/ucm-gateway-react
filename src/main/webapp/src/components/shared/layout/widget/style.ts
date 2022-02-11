import {Theme} from "@mui/material";


import makeStyles from '@mui/styles/makeStyles';


export const widgetStyles = makeStyles((theme: Theme) => ({
    widgetWrapper: {
        display: "flex",
        // minHeight: "100%",
        marginBottom: theme.spacing(3)
    },
    widgetRoot: {
        boxShadow: "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    },
    paper: {
        display: "flex",
        flexDirection: "column",
        flexGrow: 1,
        overflow: "hidden",
    },
    moreButton: {
        margin: -theme.spacing(1),
        padding: 0,
        width: 40,
        height: 40,
        color: theme.palette.text.secondary,
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: "rgba(255, 255, 255, 0.35)",
        },
    },
    widgetHeader: {
        padding: theme.spacing(3),
        paddingBottom: theme.spacing(1),
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    widgetBody: {
        paddingBottom: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingLeft: theme.spacing(3),
    },
    noPadding: {
        padding: 0,
    },
}))