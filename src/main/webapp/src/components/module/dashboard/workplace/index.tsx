import React from 'react';
import {Route, Routes} from 'react-router-dom';
import WorkPlaces from "./workplace";
import WorkPlaceManage from "./workplace-create-update";
import WorkplaceDetails from "./workplace-details";


export default function WorkPlaceRouter() {
    return (
    <Routes>
        <Route path='/' element={<WorkPlaces/>}/>
        <Route path='add' element={<WorkPlaceManage/>}/>
        <Route path='edit/:id' element={<WorkPlaceManage/>}/>
        <Route path='show/:id' element={<WorkplaceDetails/>}/>
    </Routes>
    )
};