import React from 'react'
import {RouteComponentProps, Switch} from "react-router-dom";
import ErrorBoundaryRoute from "../../../../shared/error/error-boundary-route";
import EmployeeManage from "./employee-create-update";
import Employees from "./employee";
import EmployeeDetails from "./employee-details";

export default function Routes({match}: RouteComponentProps) {
    return (
        <>
            <Switch>
                <ErrorBoundaryRoute exact path={`${match.url}/add`} component={EmployeeManage}/>
                <ErrorBoundaryRoute exact path={`${match.url}/edit/:id`} component={EmployeeManage}/>
                <ErrorBoundaryRoute exact path={`${match.url}/show/:id`} component={EmployeeDetails}/>
                <ErrorBoundaryRoute path={`${match.url}`} component={Employees}/>
            </Switch>
        </>
    )
}