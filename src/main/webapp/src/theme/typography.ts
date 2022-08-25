import {TypographyOptions} from "@mui/material/styles/createTypography";
import {Palette} from "@mui/material";

/**
 * Typography used in theme
 * @param palette
 */
export default function themeTypography(palette: Palette): TypographyOptions {
    return {
        fontFamily: ['"Open Sans"', 'sans-serif'].join(','),
        h6: {
            fontWeight: 500,
            color: palette.grey["900"],
            fontSize: '0.75rem'
        },
        h5: {
            fontSize: '0.875rem',
            color: palette.grey["900"],
            fontWeight: 500
        },
        h4: {
            fontSize: '1rem',
            color:  palette.grey['900'],
            fontWeight: 600
        },
        h3: {
            fontSize: '1.25rem',
            color:  palette.grey['900'],
            fontWeight: 600
        },
        h2: {
            fontSize: '1.5rem',
            color:  palette.grey['900'],
            fontWeight: 700
        },
        h1: {
            fontSize: '2.125rem',
            color:  palette.grey['900'],
            fontWeight: 700
        },
        subtitle1: {
            fontSize: '0.875rem',
            fontWeight: 500,
        },
        subtitle2: {
            fontSize: '0.75rem',
            fontWeight: 400,
        },
        caption: {
            fontSize: '0.75rem',
            color: palette.grey['900'],
            fontWeight: 400
        },
        body1: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: '1.334em'
        },
        body2: {
            letterSpacing: '0em',
            fontWeight: 400,
            lineHeight: '1.5em',
        },
        subMenuCaption: {
            fontSize: '0.6875rem',
            fontWeight: 500,
            color:  palette.grey['500'],
            textTransform: 'capitalize'
        }
    }
}