import React, {lazy} from 'react';
import {Route, Routes} from 'react-router-dom';
import {CONFIG} from './config/constants';
import Loadable from "./components/shared/components/Loadable";

const Logout = Loadable(lazy(() => import("./components/module/login/Logout")));
const Dashboard = Loadable(lazy(() => import("./components/module/dashboard")));
const Nomenclature = Loadable(lazy(() => import("./components/module/dashboard/nomenclature")));
const Employee = Loadable(lazy(() => import("./components/module/dashboard/person/employee")));
const Student = Loadable(lazy(() => import("./components/module/dashboard/person/student")));
const Phone = Loadable(lazy(() => import("./components/module/dashboard/phone")));
const WorkPlace = Loadable(lazy(() => import("./components/module/dashboard/workplace")));
const Directory = Loadable(lazy(() => import("./components/module/directory/directory")));
const PageNotFound = Loadable(lazy(() => import("./components/shared/error/page-not-found")));
const LoginRedirect = Loadable(lazy(() => import("./components/shared/error/page-not-found")));

/**
 *The LoginRedirect component always comes before the Dashboard component.
 * The order is very important, because the PrivateRoute component creates an infinite loop with the path "/"
 * of the Dashboard component and never looks at the path of the LoginRedirect component. You can define
 * the most specific Dashboard path as "/dashboard"
 * @constructor
 */
export default function AppRoute() {
    // let location = useLocation<RouteComponentProps>();
    // React.useEffect(() => window.scrollTo(0, 0), [location.pathname]);
    // return (
    //   <Switch>
    //     <ErrorBoundaryRoute path='/logout' component={Logout} />
    //     <ErrorBoundaryRoute path='/' exact component={Directory} />
    //       {/*Read the explanation above the component*/}
    //     <ErrorBoundaryRoute path={CONFIG.LOGIN_URL} component={LoginRedirect} />
    //     <PrivateRoute path='/' hasAnyAuthorities={[AUTHORITIES.ADMIN]} component={Dashboard} />
    //     <ErrorBoundaryRoute component={PageNotFound} />
    //   </Switch>
    // );
    return (
        <Routes>
            <Route path='/' element={<Directory/>}/>
            <Route path='logout' element={<Logout/>}/>
            <Route path='dashboard' element={<Dashboard/>}>
                <Route path='nomenclature/*' element={<Nomenclature/>}/>
                <Route path='phone/*' element={<Phone/>}/>
                <Route path='workplace/*' element={<WorkPlace/>}/>
                <Route path='employee/*' element={<Employee/>}/>
                <Route path='student/*' element={<Student/>}/>
            </Route>
            <Route path={CONFIG.LOGIN_URL} element={<LoginRedirect/>}/>
            <Route path='*' element={<PageNotFound/>}/>
        </Routes>
    )
}
