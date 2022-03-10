import React from 'react';
import {Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography, useTheme} from "@mui/material";
import {
    ExpandLess as ExpandLessIcon,
    ExpandMore as ExpandMoreIcon,
    FiberManualRecord,
    SvgIconComponent
} from '@mui/icons-material';
import NavItem, {IItem} from "./nav-item";

export interface ICollapse {
    id: string
    title: string
    caption?: string
    children: Array<IItem | ICollapse>
    icon?: SvgIconComponent,
}

interface INavCollapse {
    key: string,
    menu: ICollapse,
    level: number
}

/**
 * SIDEBAR MENU COLLAPSE ITEMS
 */
const NavCollapse = ({menu, level}: INavCollapse) => {
    const theme = useTheme();
    const Icon = menu.icon;
    const [open, setOpen] = React.useState(false);
    const [selected, setSelected] = React.useState<string | null>(null);

    const handleClick = () => {
        setOpen(!open);
        setSelected(!selected ? menu.id : null);
    };

    // menu collapse & item
    const menus = menu.children.map(_menu => {
        if ('url' in _menu) {
            return <NavItem key={_menu.id} item={_menu as IItem} level={level + 1}/>
        } else {
            return <NavCollapse key={menu.id} menu={_menu as ICollapse} level={level + 1}/>
        }
    })

    const menuIcon = Icon ? (
        <Icon sx={{my: 'auto', fontSize: '1.3rem'}}/>
    ) : (
        <FiberManualRecord
            sx={{
                width: selected === menu.id ? 8 : 6,
                height: selected === menu.id ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );
    return (
        <>
            <ListItemButton
                sx={{
                    mb: 0.5,
                    alignItems: 'flex-start',
                    backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                    py: level > 1 ? 1 : 1.25,
                    pl: `${level * 24}px`
                }}
                selected={selected === menu.id}
                onClick={handleClick}
            >
                <ListItemIcon sx={{my: 'auto', minWidth: !menu.icon ? 18 : 36}}>
                    {menuIcon}
                </ListItemIcon>
                <ListItemText
                    primary={
                        <Typography variant={selected === menu.id ? 'h5' : 'body1'}>
                            {menu.title}
                        </Typography>
                    }
                    secondary={
                        <Typography variant="caption" sx={{...theme.typography.subMenuCaption}}
                                    display="block" gutterBottom
                        >
                            {menu.caption}
                        </Typography>
                    }
                />
                {open ?
                    (<ExpandMoreIcon sx={{my: 'auto'}}/>)
                    :
                    (<ExpandLessIcon sx={{my: 'auto'}}/>)
                }
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List
                    component="div"
                    disablePadding
                    sx={{
                        position: 'relative',
                        '&:after': {
                            content: "''",
                            position: 'absolute',
                            left: '32px',
                            top: 0,
                            height: '100%',
                            width: '1px',
                            opacity: 1,
                            background: theme.palette.primary.light
                        }
                    }}
                >
                    {menus}
                </List>
            </Collapse>
        </>
    );
};

export default NavCollapse;