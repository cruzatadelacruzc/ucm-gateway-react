import React from "react";
import Phones from "./phones";
import {RouteComponentProps, Switch} from "react-router-dom";
import ErrorBoundaryRoute from "../../../shared/error/error-boundary-route";

export default function Routes({match}: RouteComponentProps) {
    return (
        <Switch>
            <ErrorBoundaryRoute path={match.url} component={Phones}/>
        </Switch>
    )
};