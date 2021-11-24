import React from "react";
import Students from "./students";
import StudentManage from "./student-create-update";
import {RouteComponentProps, Switch} from "react-router-dom";
import ErrorBoundaryRoute from "../../../../shared/error/error-boundary-route";

export default function Routes({match}: RouteComponentProps) {
    return (
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/add`} component={StudentManage}/>
            <ErrorBoundaryRoute exact path={`${match.url}/edit/:id`} component={StudentManage}/>
            <ErrorBoundaryRoute path={`${match.url}`} component={Students}/>
        </Switch>
    )
}