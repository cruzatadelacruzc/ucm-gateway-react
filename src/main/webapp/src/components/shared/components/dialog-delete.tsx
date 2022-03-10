import React from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    useMediaQuery
} from "@mui/material";
import {Close as CloseIcon} from "@mui/icons-material";
import {dialogDeleteStyle} from "./style";
import {useTranslation} from "react-i18next";
import useTheme from "@mui/material/styles/useTheme";

interface IDialogDelete {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    title: string
    content: string
    deleteItem: () => void
}
const DialogDelete = (props: IDialogDelete) => {
    const theme = useTheme();
    const classes = dialogDeleteStyle()
    const {t} = useTranslation(['common']);
    return (
        <Dialog
            open={props.open}
            onClose={() => props.setOpen(false)}
            fullScreen={useMediaQuery(theme.breakpoints.down('md'))}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title"> {props.title}</DialogTitle>
            <IconButton
                aria-label="close"
                className={classes.closeButton}
                onClick={() => props.setOpen(false)}
                size="large">
                <CloseIcon/>
            </IconButton>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">{props.content}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)} color="primary">{t('cancel')}</Button>
                <Button onClick={() => props.deleteItem()} color="primary" autoFocus>{t('accept')}</Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogDelete;