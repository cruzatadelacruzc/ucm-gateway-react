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
} from "@material-ui/core";
import theme from "../../../theme";
import {Close as CloseIcon} from "@material-ui/icons";
import {dialogDeleteStyle} from "./style";
import {useTranslation} from "react-i18next";

interface IDialogDelete {
    open: boolean
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    title: string
    content: string
    deleteItem: () => void
}
const DialogDelete = (props: IDialogDelete) => {
    const classes = dialogDeleteStyle()
    const {t} = useTranslation(['common']);
    return (
        <Dialog
            open={props.open}
            onClose={() => props.setOpen(false)}
            fullScreen={useMediaQuery(theme.breakpoints.down('sm'))}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title"> {props.title}</DialogTitle>
            <IconButton aria-label="close" className={classes.closeButton} onClick={() => props.setOpen(false)}>
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