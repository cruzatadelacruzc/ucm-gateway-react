import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {AUTHORITIES, CONFIG} from './config/constants';
import Loadable from "./components/shared/components/Loadable";
import RequireAuth from "./components/shared/auth/private-route";

const Logout = Loadable(lazy(() => import("./components/module/login/logout")));
const Dashboard = Loadable(lazy(() => import("./components/module/dashboard")));
const Nomenclature = Loadable(lazy(() => import("./components/module/dashboard/nomenclature")));
const Employee = Loadable(lazy(() => import("./components/module/dashboard/person/employee")));
const Student = Loadable(lazy(() => import("./components/module/dashboard/person/student")));
const Phone = Loadable(lazy(() => import("./components/module/dashboard/phone")));
const WorkPlace = Loadable(lazy(() => import("./components/module/dashboard/workplace")));
const Directory = Loadable(lazy(() => import("./components/module/directory/directory")));
const PageNotFound = Loadable(lazy(() => import("./components/shared/error/page-not-found")));
const LoginRedirect = Loadable(lazy(() => import("./components/module/login/login-redirect")));

/**
 *The LoginRedirect component always comes before the Dashboard component.
 * The order is very important, because the PrivateRoute component creates an infinite loop with the path "/"
 * of the Dashboard component and never looks at the path of the LoginRedirect component. You can define
 * the most specific Dashboard path as "/dashboard"
 * @constructor
 */
export default function AppRoute() {
    return (
        <Routes>
            <Route path='/' element={<Directory/>}/>
            <Route path='logout' element={<Logout/>}/>
            <Route path={CONFIG.LOGIN_URL} element={<LoginRedirect/>}/>
            <Route path='dashboard' element={<RequireAuth hasAnyAuthorities={[AUTHORITIES.ADMIN]} children={<Dashboard/>}/>}>
               <Route path='nomenclature/*' element={<Nomenclature/>}/>
               <Route path='phone/*' element={<Phone/>}/>
               <Route path='workplace/*' element={<WorkPlace/>}/>
               <Route path='employee/*' element={<Employee/>}/>
               <Route path='student/*' element={<Student/>}/>
            </Route>
            <Route path='*' element={<PageNotFound/>}/>
        </Routes>
    )
}
