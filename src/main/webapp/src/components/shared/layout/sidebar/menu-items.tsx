import React from 'react';
import {
    Apps as AppsIcon,
    Business as BusinessIcon,
    ContactPhone as ContactPhoneIcon,
    Dashboard as DashboardIcon,
    Engineering as EngineeringIcon,
    School as SchoolIcon
} from "@mui/icons-material";
import NavGroup from "./nav-group";
import {useTranslation} from "react-i18next";
import {IItem} from "./nav-item";
import {ICollapse} from "./nav-collapse";

export interface IMenuItems {
    id: string,
    title: string,
    caption?: string,
    children: Array<IItem | ICollapse>
}

/**
 * SIDEBAR MENU LIST
 */
const MenuItems = () => {
    const {t} = useTranslation(['error', 'common'])
    const menuItems: Array<IMenuItems> = [
        {
            id: 'dashboard',
            title: t("common:dashboard"),
            children: [
                {
                id: 'home',
                title: t("common:dashboard"),
                url: "/dashboard",
                icon: DashboardIcon
            }
            ]
        },
        {
            id: 'manage',
            title: 'Manage',
            children: [
                {
                    id: 'nomenclature',
                    title: t("common:entities.directoryNomenclature"),
                    url: "/dashboard/nomenclature",
                    icon: AppsIcon,
                    breadcrumbs: false
                },
                {
                    id: 'student',
                    title: t("common:entities.directoryStudent"),
                    url: "/dashboard/student",
                    icon: SchoolIcon,
                    breadcrumbs: false
                },
                {
                    id: 'employee',
                    title: t("common:entities.directoryEmployee"),
                    url: "/dashboard/employee",
                    icon: EngineeringIcon,
                    breadcrumbs: false
                },
                {
                    id: 'phone',
                    title: t("common:entities.directoryPhone"),
                    url: "/dashboard/phone",
                    icon: ContactPhoneIcon,
                    breadcrumbs: false
                },
                {
                    id: 'workplace',
                    title: t("common:entities.directoryWorkPlace"),
                    url: "/dashboard/workplace",
                    icon: BusinessIcon,
                    breadcrumbs: false
                }
            ]
        }
    ]
    return (<>{menuItems.map(menu => <NavGroup key={menu.id} item={menu}/>)}</>);
};

export default MenuItems;