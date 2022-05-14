import React from 'react';
import useTheme from "@mui/material/styles/useTheme";
import {FiberManualRecord, SvgIconComponent} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {IRootState} from "../../reducer";
import {Link as LinkRouter, LinkProps as LinkRouterProps} from "react-router-dom";
import {
    Link,
    LinkBaseProps,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery
} from "@mui/material";
import {menuOpen, setMenu} from "../../reducer/customization.reducer";

export interface IItem {
    id: string,
    url: string,
    title: string,
    target?: true,
    caption?: string,
    disabled?: boolean,
    external?: boolean,
    breadcrumbs?: boolean,
    icon?: SvgIconComponent,
}

interface INavItem {
    key: string,
    item: IItem,
    level: number
}

/**
 * SIDEBAR MENU ITEM
 */
const NavItem = ({item, level} : INavItem) => {
    const Icon = item?.icon
    const theme = useTheme();
    const dispatch = useDispatch();
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
    const isOpen = useSelector((state: IRootState) => state.customization.isOpen);

    const itemIcon = Icon ?
        (
            <Icon sx={{fontSize: '1.3rem'}}/>
        ) : (
            <FiberManualRecord
                sx={{
                    width: isOpen.findIndex((id: string) => id === item.id) > -1 ? 8 : 6,
                    height: isOpen.findIndex((id: string) => id === item.id) > -1 ? 8 : 6
                }}
                fontSize={level > 0 ? 'inherit' : 'medium'}
            />
        )

    let itemTarget = '_self';
    if (item.target) {
        itemTarget = '_blank'
    }

    let listItemProps = {
        component: React.forwardRef<HTMLAnchorElement, LinkRouterProps>((props, _ref) => <LinkRouter
            ref={_ref}
            {...props}
            to={item.url}
            target={itemTarget}
        />)
    }
   if (item.external) {
        listItemProps = {component: React.forwardRef<HTMLAnchorElement, LinkBaseProps>((props, _ref) => <Link
                ref={_ref}
                {...props}
                href={item.url}
                rel="noopener"
                target={itemTarget}
            />)
        }
    }

    const itemHandler = (id) => {
        dispatch(menuOpen(id));
        if (matchesSM){
            dispatch(setMenu(false));
        }
    };

    // active menu item on page load
    React.useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch(menuOpen(item.id));
        }
        // eslint-disable-next-line
    }, []);

    return (
        <ListItemButton
            {...listItemProps}
            disabled={item.disabled}
            sx={{
                mb: 0.5,
                borderRadius: '4px',
                alignItems: 'flex-start',
                backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                py: level > 1 ? 1 : 1.25,
                pl: `${level * 24}px`
            }}
            selected={isOpen.findIndex((id) => id === item.id) > -1}
            onClick={() => itemHandler(item.id)}
        >
            <ListItemIcon sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>{itemIcon}</ListItemIcon>
            <ListItemText
              primary={
                  <Typography variant={isOpen.findIndex((id) => id === item.id) > -1 ? 'h5' : 'body1'}>
                      {item.title}
                  </Typography>
              }
              secondary={
                  <Typography variant='caption' sx={{ ...theme.typography.subMenuCaption }} display="block" gutterBottom>
                      {item.caption}
                  </Typography>
              }
            />
        </ListItemButton>
    );
};

export default NavItem;