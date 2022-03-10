import React from 'react';
import useTheme from "@mui/material/styles/useTheme";
import {Divider, List, Typography} from "@mui/material";
import NavItem from "./nav-item";
import NavCollapse from "./nav-collapse";
import {IMenuItems} from "./menu-items";

interface INavGroup {
    key: string,
    item: IMenuItems
}

/**
 * SIDEBAR MENU LIST GROUP
 */
const NavGroup = ({item}: INavGroup) => {
    const theme = useTheme()

    // menu list collapse & items
    const items = item.children.map((menu) => {
        if ('url' in menu) {
            return <NavItem key={menu.id} item={menu} level={1}/>;
        } else {
            return <NavCollapse key={menu.id} menu={menu} level={1}/>;
        }
    })

    return (
        <>
            <List
                subheader={
                    item.title && (
                        <Typography variant="caption" sx={{...theme.typography.menuCaption}} display="block"
                                    gutterBottom>
                            {item.title}
                            {item.caption && (
                                <Typography variant="caption" sx={{...theme.typography.subMenuCaption}} display="block"
                                            gutterBottom>
                                    {item.caption}
                                </Typography>
                            )}
                        </Typography>
                    )
                }
            >
                {items}
            </List>
            {/* group divider */}
            <Divider sx={{mt: 0.25, mb: 1.25}}/>
        </>
    );
};

export default NavGroup;