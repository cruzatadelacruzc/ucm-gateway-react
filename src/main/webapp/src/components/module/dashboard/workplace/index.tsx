import React from 'react';
import {RouteComponentProps, Switch} from "react-router-dom";
import ErrorBoundaryRoute from "../../../shared/error/error-boundary-route";
import WorkPlaces from "./workplace";


export default function Routes({match}: RouteComponentProps) {
    return (
        <Switch>
            <ErrorBoundaryRoute path={match.url} component={WorkPlaces}/>
        </Switch>
    )
};