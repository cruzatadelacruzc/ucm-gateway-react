/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */
import {PaletteOptions} from "@mui/material";

export default function themePalette(theme): PaletteOptions {
    return {
        mode: 'light',
        common: {
            black: '#111936'
        },
        primary: {
            main: '#2196f3',
            light: '#e3f2fd',
            dark: '#1e88e5',
            "200": '#90caf9',
            "800": '#1565c0'
        },
        secondary: {
            main: '#673ab7',
            light: '#ede7f6',
            dark: '#5e35b1',
            "200": '#b39ddb',
            "800": '#4527a0'
        },
        error: {
            main: '#f44336',
            light: '#ef9a9a',
            dark: '#c62828'
        },
        warning: {
            main: '#ffe57f',
            light: '#fff8e1',
            dark: '#ffc107'
        },
        success: {
            main: '#00e676',
            light: '#b9f6ca',
            dark: '#00c853',
            "200": '#69f0ae'
        },
        grey: {
            "50": '#fafafa',
            "100": '#f5f5f5',
            "200": '#eeeeee',
            "300": '#e0e0e0',
            "500": '#9e9e9e',
            "600": '#757575',
            "700": '#616161',
            "900": '#212121'
        },
        text: {
            primary: '#bdc8f0',
            secondary: '#8492c4'
        },
        background: {
            paper: '#ffffff',
            default: '#ffffff'
        },
        divider: '#eeeeee'
    }
}