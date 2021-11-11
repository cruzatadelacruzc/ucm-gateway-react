import React from 'react';
import {RouteComponentProps, Switch} from "react-router-dom";
import ErrorBoundaryRoute from "../../../shared/error/error-boundary-route";
import WorkPlaces from "./workplace";
import WorkPlaceManage from "./workplace-create-update";
import WorkplaceDetails from "./workplace-details";


export default function Routes({match}: RouteComponentProps) {
    return (
        <Switch>
            <ErrorBoundaryRoute exact path={`${match.url}/show/:id`} component={WorkplaceDetails}/>
            <ErrorBoundaryRoute exact path={`${match.url}/edit/:id`} component={WorkPlaceManage}/>
            <ErrorBoundaryRoute exact path={`${match.url}/add`} component={WorkPlaceManage}/>
            <ErrorBoundaryRoute path={match.url} component={WorkPlaces}/>
        </Switch>
    )
};