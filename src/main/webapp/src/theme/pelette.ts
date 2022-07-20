/**
 * Color intention that you want to used in your theme
 * @param {JsonObject} theme Theme customization object
 */
import {PaletteOptions} from "@mui/material";

export default function themePalette(): PaletteOptions {
    return {
        mode: 'light',
        common: {
            black: '#111936'
        },
        primary: {
            main: '#0064B0',
            light: '#5491e2',
            dark: '#003b80',
            contrastText: '#fff',
            "50": '#e3f1fa',
            "100": '#baddf5',
            "200": '#8fc8ef',
            "300": '#64b2e8',
            "400": '#43a2e5',
            "500": '#2093e1',
            "600": '#1786d4',
            "700": '#0081ca',
            "800": '#0064B0',
            "900": '#004791'
        },
        secondary: {
            main: '#00aeef',
            light: '#66e0ff',
            dark: '#007fbc',
            contrastText: '#000',
            "50": '#e0f4fd',
            "100": '#b0e2f9',
            "200": '#7bd0f5',
            "300": '#43bdf1',
            "400": '#00afef',
            "500": '#00a1ec',
            "600": '#0094de',
            "700": '#0081ca',
            "800": '#0070b6',
            "900": '#005195'
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
        background: {
            paper: '#ffffff',
            default: '#ffffff'
        },
        divider: '#cdc7c7'
    }
}