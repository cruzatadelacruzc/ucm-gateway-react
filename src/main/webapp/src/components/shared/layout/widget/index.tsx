import React from 'react';
import {widgetStyles} from "./style";
import {IconButton, Menu, MenuItem, Paper, Typography} from "@material-ui/core";
import MoreIcon from "@material-ui/icons/MoreVert";
import classnames from 'classnames'
import {useTranslation} from "react-i18next";

export interface IWidget {
    header?: JSX.Element
    children: JSX.Element
    title?: String
    noBodyPadding?
    bodyClass?
    disableWidgetMenu?
}

const Widget = ({header, title, children, noBodyPadding, bodyClass, disableWidgetMenu}: IWidget) => {
    const classes = widgetStyles();
    const {t} = useTranslation(['common']);
    const [isMoreMenuOpen, setMoreMenuOpen] = React.useState(false);
    const [isMoreButtonRef, setMoreButtonRef] = React.useState<null | HTMLElement>(null);

    const menuHeaderId = "menu-header-id"
    return (
        <div className={classes.widgetWrapper}>
            <Paper className={classes.paper} classes={{root: classes.widgetRoot}}>
                <div className={classes.widgetHeader}>
                    {header ? (
                        header
                    ) : (
                        <>
                            <Typography variant="h5" color="textSecondary">
                                {title}
                            </Typography>
                            {!disableWidgetMenu && (
                                <IconButton
                                    color="primary"
                                    classes={{ root: classes.moreButton }}
                                    aria-owns={menuHeaderId}
                                    aria-haspopup="true"
                                    onClick={() => setMoreMenuOpen(true)}
                                    buttonRef={setMoreButtonRef}
                                >
                                    <MoreIcon/>
                                </IconButton>
                            )}
                        </>
                    )}
                    </div>
                <div
                    className={classnames(classes.widgetBody, {
                        [classes.noPadding]: noBodyPadding,
                        [bodyClass]: bodyClass,
                    })}
                >
                    {children}
                </div>
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
        </div>
    )
}

export default Widget;