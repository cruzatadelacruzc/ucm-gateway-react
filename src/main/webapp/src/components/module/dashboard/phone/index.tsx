import React from "react";
import Phones from "./phones";
import PhoneManage from "./phone-create-update";
import {RouteComponentProps, Switch} from "react-router-dom";
import ErrorBoundaryRoute from "../../../shared/error/error-boundary-route";
import PhoneDetails from "./phone-details";

export default function Routes({match}: RouteComponentProps) {
    return (
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/show/:id`} component={PhoneDetails}/>
            <ErrorBoundaryRoute exact path={`${match.url}/edit/:id`} component={PhoneManage}/>
            <ErrorBoundaryRoute exact path={`${match.url}/add`} component={PhoneManage}/>
            <ErrorBoundaryRoute path={match.url} component={Phones}/>
        </Switch>
    )
};