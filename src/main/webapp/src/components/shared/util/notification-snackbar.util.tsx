import React from 'react'
import {OptionsObject, useSnackbar, WithSnackbarProps} from "notistack"

// Must be imported at least once in the app to initialize the ref
let snackbarRef: WithSnackbarProps
export const SnackbarUtilsConfigurator: React.FC = () => {
    snackbarRef = useSnackbar()
    return <></>
}

// Export no-named default so consumer can name as desired/required
const notification = {
    success(msg: string, options: OptionsObject = {}): void {
        this.toast(msg, {...options, variant: "success"})
    },
    warning(msg: string, options: OptionsObject = {}): void {
        this.toast(msg, {...options, variant: "warning"})
    },
    info(msg: string, options: OptionsObject = {}): void {
        this.toast(msg, {...options, variant: "info"})
    },
    error(msg: string, options: OptionsObject = {}): void {
        this.toast(msg, {...options, variant: "error"})
    },
    toast(msg: string, options: OptionsObject = {}): void {
        snackbarRef.enqueueSnackbar(msg, options)
    },
}

export default notification
