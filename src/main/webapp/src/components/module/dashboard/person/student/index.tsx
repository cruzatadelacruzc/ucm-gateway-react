import React from "react";
import Students from "./students";
import {RouteComponentProps, Switch} from "react-router-dom";
import ErrorBoundaryRoute from "../../../../shared/error/error-boundary-route";

export default function Routes({match}: RouteComponentProps) {
    return (
        <>
            <Switch>
                <ErrorBoundaryRoute path={`${match.url}`} component={Students}/>
            </Switch>
        </>
    )
}