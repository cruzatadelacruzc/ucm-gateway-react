import '@fontsource/roboto';
import {createTheme} from "@material-ui/core/styles";
import {blue, grey, indigo} from "@material-ui/core/colors";

export default createTheme({
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
});

