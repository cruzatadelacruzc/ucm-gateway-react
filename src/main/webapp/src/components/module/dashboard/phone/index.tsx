import React, {lazy} from "react";
import {Route, Routes} from 'react-router-dom';
import Phones from "./phones";

const PhoneManage = lazy( () => import('./phone-create-update'));
const PhoneDetails = lazy( () => import('./phone-details'));

export default function PhoneRouter() {
    return (
        <Routes>
            <Route path='/' element={<Phones/>}/>
            <Route path='add' element={<PhoneManage/>}/>
            <Route path='edit/:id' element={<PhoneManage/>}/>
            <Route path='show/:id' element={<PhoneDetails/>}/>
        </Routes>
    )
};