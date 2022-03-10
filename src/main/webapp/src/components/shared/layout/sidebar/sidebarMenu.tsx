import React, {useState} from "react";
import {useLocation} from "react-router-dom";
import {sidebarStyles} from "./style";
import classnames from "classnames";
import {Collapse, Divider, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import ViewStreamIcon from '@mui/icons-material/ViewStream';

export interface ISidebarMenu {
    link: string,
    icon?: JSX.Element,
    label: string,
    children?: Array<{ label: string, link: string, icon }>,
    isSidebarOpened,
    type?: string,
    nested?: boolean
}

const SidebarMenu = ({
                         link,
                         icon,
                         label,
                         children,
                         isSidebarOpened,
                         type,
                         nested = false
                     }: ISidebarMenu) => {
    const location = useLocation();
    const classes = sidebarStyles();
    const [isOpen, setIsOpen] = useState(false);

    const isLinkActive =  link && (location.pathname === link || location.pathname.indexOf(link) !== -1);

    if (type === "divider") {
        return <Divider className={classes.divider}/>;
    }

    if (type === "title") {
        return (
            <Typography
                className={classnames(classes.linkText, classes.sectionTitle, {
                    [classes.linkTextHidden]: !isSidebarOpened,
                })}
            >
                {label}
            </Typography>
        );
    }

    if (!children) {
        return (
            <ListItem
                className={classes.link}
            >
                <ListItemIcon
                    className={classnames(classes.linkIcon, {
                        [classes.linkIconActive]: isLinkActive,
                    })}
                >
                    {nested ? <ViewStreamIcon /> : icon}
                </ListItemIcon>
                <ListItemText
                    classes={{
                        primary: classnames(classes.linkText, {
                            [classes.linkTextActive]: isLinkActive,
                            [classes.linkTextHidden]: !isSidebarOpened,
                        }),
                    }}
                    primary={label}
                />
            </ListItem>
        );
    }

    function toggleCollapse(e) {
        if (isSidebarOpened) {
            e.preventDefault();
            setIsOpen(!isOpen);
        }
    }
    return (
        <>
            <ListItem
                onClick={toggleCollapse}
                className={classes.link}
            >
                <ListItemIcon
                    className={classnames(classes.linkIcon, {
                        [classes.linkIconActive]: isLinkActive,
                    })}
                >
                    {icon ? icon : <ViewStreamIcon />}
                </ListItemIcon>
                <ListItemText
                    classes={{
                        primary: classnames(classes.linkText, {
                            [classes.linkTextActive]: isLinkActive,
                            [classes.linkTextHidden]: !isSidebarOpened,
                        }),
                    }}
                    primary={label}
                />
            </ListItem>
            {children && (
                <Collapse
                    in={isOpen && isSidebarOpened}
                    timeout="auto"
                    unmountOnExit
                    className={classes.nestedList}
                >
                    <List component="div" disablePadding>
                        {children.map((childrenLink, index) => (
                            <SidebarMenu
                                key={index}
                                isSidebarOpened={isSidebarOpened}
                                nested={true}
                                {...childrenLink}
                            />
                        ))}
                    </List>
                </Collapse>
            )}
        </>
    )
}

export default SidebarMenu
