import {createTheme, Theme, ThemeOptions} from "@mui/material/styles";
import componentStyleOverrides from "./component-style-override";
import themeTypography from "./typography";
import themePalette from "./pelette";
import createTypography from "@mui/material/styles/createTypography";


const theme = (): Theme => {
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

