import React from 'react';
import Home from './home/home';
import classnames from "classnames";
import {dashboardStyles} from "./style";
import {Switch} from 'react-router-dom';
import Nomenclature from "./nomenclature";
import Header from '../../shared/layout/header';
import Sidebar from "../../shared/layout/sidebar";
import ErrorBoundaryRoute from '../../shared/error/error-boundary-route';
import Employees from "./person/employee";


const Dashboard = ({match}) => {
    const classes = dashboardStyles();
    const [isSidebarOpened, setIsSidebarOpened] = React.useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpened( prevIsSidebarOpened => !prevIsSidebarOpened);
    };
    return <div className={classes.root}>
        <Header {...{ toggleSidebar, isSidebarOpened }}/>
        <Sidebar {...{ toggleSidebar, isSidebarOpened }}/>
        <div
            className={classnames(classes.content, {
                [classes.contentShift]: isSidebarOpened,
            })}
        >
            <div className={classes.fakeToolbar} />
            <Switch>
                <ErrorBoundaryRoute path={`${match.url}home`} component={Home}/>
                <ErrorBoundaryRoute path={`${match.url}employee`} component={Employees}/>
                <ErrorBoundaryRoute path={`${match.url}nomenclature`} component={Nomenclature}/>
            </Switch>
        </div>
    </div>
};

export default Dashboard;
