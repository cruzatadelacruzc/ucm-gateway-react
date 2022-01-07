import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

export const dashboardStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
        maxWidth: "100vw",
        overflowX: "hidden",
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        width: `calc(100vw - 240px)`,
        minHeight: "100vh",
    },
    contentShift: {
        width: `calc(100vw - ${240 + theme.spacing(6)}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    fakeToolbar: {
        ...theme.mixins.toolbar,
    },
}));

export const formUpdateStyles = makeStyles((theme: Theme) => createStyles({
    form_group: {
        display: "flex",
        flexDirection: "row",
        flexWrap: 'wrap',
        [theme.breakpoints.down('xs')]: {
            flexDirection: "column",
        }
    },
    input: {
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(3),
        flex: '2 2 10em',
        [theme.breakpoints.down('xs')]: {
            marginBottom: theme.spacing(1),
            marginRight: theme.spacing(0),
        },
        [theme.breakpoints.down('sm')]: {
            flex: '1 1 auto'
        }
    },
    inputSM: {
        marginRight: theme.spacing(3),
        marginBottom: theme.spacing(3),
        flex: '1 1 5em',
        [theme.breakpoints.down('xs')]: {
            marginBottom: theme.spacing(1),
            marginRight: theme.spacing(0),
        },
        [theme.breakpoints.down('sm')]: {
            flex: '1 1 auto'
        }
    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-start",
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            flexDirection: "column",
        }
    },
    button: {
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            marginRight: theme.spacing(0),
            marginBottom: theme.spacing(1)
        }
    }
}));

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
        order: 1,
        [theme.breakpoints.down('xs')]: {
            order: 2,
            marginRight: theme.spacing(0),
            marginBottom: theme.spacing(1)
        }
    },
    buttonAdd: {
        order: 2,
        flex: '1 1 auto',
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            order: 1,
            marginRight: theme.spacing(0),
            marginBottom: theme.spacing(1)
        }
    },
}))

export const dataTableStyles = makeStyles((theme: Theme) => ({
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
        [theme.breakpoints.down('xs')]: {
            flexDirection: "column",
        }
    },
    data_column: {
        display: "flex",
        flex: '1 1 10em',
        flexDirection: "column",
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            marginBottom: theme.spacing(1),
            marginRight: theme.spacing(0),
        }
    },
    data_cell: {
        flex: '1 1 4em',
        [theme.breakpoints.down('xs')]: {
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
        [theme.breakpoints.down('xs')]: {
            flexDirection: "column",
        }
    },
    button: {
        marginRight: theme.spacing(3),
        [theme.breakpoints.down('xs')]: {
            width: "100%",
            marginRight: theme.spacing(0),
            marginBottom: theme.spacing(1)
        }
    }
}));

export const MenuProps =
    // ITEM_HEIGHT = 55;
    // ITEM_PADDING_TOP = 12;
    {
        MenuProps: {
            PaperProps: {
                style: {
                    maxHeight: 55 * 4.5 + 12,
                }
            },
            getContentAnchorEl: null,
            anchorOrigin: {
                vertical: "bottom",
                horizontal: "left"
            }
        }
    }
