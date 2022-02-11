import '@fontsource/roboto';
import {adaptV4Theme, createTheme} from "@mui/material/styles";
import {blue, grey, indigo} from "@mui/material/colors";

export default createTheme(adaptV4Theme({
    palette: {
        background: {
            default: grey['100'],
        },
        secondary: {
            main: blue[500],
        },
        primary: {
            main: indigo[500],
        },
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: ['"Lato"', 'sans-serif'].join(','),
    },
    overrides: {
        MuiButton: {
            root: {
                textTransform: 'none',
            },
        },
        MuiTab: {
            root: {
                textTransform: 'none',
            },
        },

    },
}));

