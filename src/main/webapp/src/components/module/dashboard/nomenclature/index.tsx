import React from 'react'
import {RouteComponentProps, Switch} from "react-router-dom";
import ErrorBoundaryRoute from "../../../shared/error/error-boundary-route";
import Nomenclature from "./nomenclature";
import NomenclatureManage from "./nomenclature-create-update";

export default function Routes({match}: RouteComponentProps) {
    return (
        <>
            <Switch>
                <ErrorBoundaryRoute exact path={`${match.url}/add`} component={NomenclatureManage}/>
                <ErrorBoundaryRoute exact path={`${match.url}/edit/:id`} component={NomenclatureManage}/>
                <ErrorBoundaryRoute path={`${match.url}`} component={Nomenclature}/>
            </Switch>
        </>
    )
}