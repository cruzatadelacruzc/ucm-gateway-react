import React from 'react';
import {IconButton, Menu, MenuItem, Paper, Typography} from "@mui/material";
import MoreIcon from "@mui/icons-material/MoreVert";
import {useTranslation} from "react-i18next";
import Box from "@mui/material/Box";
import {SxProps, Theme} from '@mui/material/styles';

interface IWidget {
    header?: JSX.Element
    children: JSX.Element
    title?: String
    noBodyPadding?
    sx?: SxProps<Theme>
    disableWidgetMenu?
}

const Widget = ({header, title, children, noBodyPadding, sx = [], disableWidgetMenu}: IWidget) => {
    const {t} = useTranslation(['common']);
    const [isMoreMenuOpen, setMoreMenuOpen] = React.useState(false);
    const [isMoreButtonRef, setMoreButtonRef] = React.useState<null | HTMLElement>(null);

    const menuHeaderId = "menu-header-id"
    return (
        <Box sx={{display: "flex"}}>
            <Paper sx={{
                display: "flex",
                flexDirection: "column",
                flexGrow: 1,
                overflow: "hidden",
            }}>
                <Box sx={{
                    p: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    {header ? (
                        header
                    ) : (
                        <>
                            <Typography variant="h3" color="textSecondary">
                                {title}
                            </Typography>
                            {!disableWidgetMenu && (
                                <IconButton
                                    color="primary"
                                    sx={{
                                        margin: -1,
                                        padding: 0,
                                        width: 40,
                                        height: 40,
                                        color: "secondary.contrastText",
                                        "&:hover": {
                                            backgroundColor: "primary.main",
                                            color: "primary.contrastText",
                                        },
                                    }}
                                    aria-owns={menuHeaderId}
                                    aria-haspopup="true"
                                    onClick={() => setMoreMenuOpen(true)}
                                    ref={setMoreButtonRef}
                                    size="large">
                                    <MoreIcon/>
                                </IconButton>
                            )}
                        </>
                    )}
                    </Box>
                <Box
                    sx={{
                        pb: noBodyPadding ?  0 : 3,
                        pr: noBodyPadding ?  0 : 3,
                        pl: noBodyPadding ?  0 : 3,
                        ...(Array.isArray(sx) ? sx : [sx]),
                    }}
                >
                    {children}
                </Box>
            </Paper>
            <Menu
                id={menuHeaderId}
                open={isMoreMenuOpen}
                anchorEl={isMoreButtonRef}
                onClose={() => setMoreMenuOpen(false)}
                disableAutoFocusItem
                >
                <MenuItem>
                    {t("common:edit")}
                </MenuItem>
                <MenuItem>
                    {t("common:copy")}
                </MenuItem>
                <MenuItem>
                    {t("common:delete")}
                </MenuItem>
                <MenuItem>
                    {t("common:print")}
                </MenuItem>
            </Menu>
        </Box>
    );
}

export default Widget;