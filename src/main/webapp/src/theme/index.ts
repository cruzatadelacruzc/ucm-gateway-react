import '@fontsource/roboto';
import {createTheme, Theme, ThemeOptions} from "@mui/material/styles";
import componentStyleOverrides from "./component-style-override";
import themeTypography from "./typography";
import themePalette from "./pelette";
import {CustomizationType} from "../components/shared/reducer/customization.reducer";
import createTypography from "@mui/material/styles/createTypography";

// export default createTheme(adaptV4Theme({
//     palette: {
//         background: {
//             default: grey['100'],
//         },
//         secondary: {
//             main: blue[500],
//         },
//         primary: {
//             main: indigo[500],
//         },
//     },
//     typography: {
//         // Use the system font instead of the default Roboto font.
//         fontFamily: ['"Lato"', 'sans-serif'].join(','),
//     },
//     overrides: {
//         MuiButton: {
//             root: {
//                 textTransform: 'none',
//             },
//         },
//         MuiTab: {
//             root: {
//                 textTransform: 'none',
//             },
//         },
//
//     },
// }));


export const theme = (customization: CustomizationType): Theme => {
    const themeOptions: ThemeOptions = {
        direction: 'ltr',
        palette: themePalette(),
        mixins: {
            toolbar: {
                minHeight: '48px',
                padding: '16px',
                '@media (min-width: 600px)': {
                    minHeight: '48px'
                }
            }
        },
    };

    const themes = createTheme(themeOptions);
    themes.components = componentStyleOverrides(themes.palette)
    themes.typography = createTypography(themes.palette, themeTypography(themes.palette))
    return themes;
}

export default theme
