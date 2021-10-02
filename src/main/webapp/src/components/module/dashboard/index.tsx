import React from 'react';
import classnames from "classnames";
import {dashboardStyles} from "./style";
import {Switch} from 'react-router-dom';
import Nomenclature from "./nomenclature";
import Header from '../../shared/layout/header';
import Sidebar from "../../shared/layout/sidebar";
import ErrorBoundaryRoute from '../../shared/error/error-boundary-route';


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
                <ErrorBoundaryRoute path={`${match.url}nomenclature`} component={Nomenclature}/>
            </Switch>
        </div>
    </div>
};

export default Dashboard;
