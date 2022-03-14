import {Palette} from "@mui/material";

export default function componentStyleOverrides(palette: Palette) {
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    borderRadius: '4px',
                    textTransform: 'none',
                }
            }
        },
        MuiListItemButton : {
            styleOverrides: {
                root: {
                    color: palette.grey["700"],
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    '&.Mui-selected': {
                        color: palette.secondary.dark,
                        backgroundColor: palette.secondary.light,
                        '&:hover': {
                            backgroundColor: palette.secondary.light,
                        },
                        '& .MuiListItemIcon-root': {
                            color: palette.secondary.dark
                        }
                    },
                    '&:hover': {
                        backgroundColor: palette.secondary.light,
                        color: palette.secondary.dark,
                        '& .MuiListItemIcon-root': {
                            color: palette.secondary.dark
                        }
                    }
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: palette.grey["700"],
                    minWidth: '36px'
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: palette.grey["900"]
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: palette.grey["900"],
                    '&::placeholder': {
                        color: palette.grey["500"],
                        fontSize: '0.9rem'
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: palette.grey["50"],
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: palette.grey["400"]
                    },
                    '&:hover $notchedOutline': {
                        borderColor: palette.primary.light
                    },
                    '&.MuiInputBase-multiline': {
                        padding: 1
                    }
                },
                input: {
                    fontWeight: 500,
                    background: palette.grey["50"],
                    padding: '15.5px 14px',
                    '&.MuiInputBase-inputSizeSmall': {
                        padding: '10px 14px',
                        '&.MuiInputBase-inputAdornedStart': {
                            paddingLeft: 0
                        }
                    },
                    inputAdornedStart: {
                        paddingLeft: 4
                    },
                    notchedOutline: {
                        borderRadius: '4px'
                    }
                },
                MuiAvatar: {
                    styleOverrides: {
                        root: {
                            color: palette.primary.dark,
                            background: palette.primary["200"]
                        }
                    }
                },
                MuiTooltip: {
                    styleOverrides: {
                        tooltip: {
                            color: palette.background.paper,
                            background: palette.grey["700"]
                        }
                    }
                }
            }
        }
    }
}