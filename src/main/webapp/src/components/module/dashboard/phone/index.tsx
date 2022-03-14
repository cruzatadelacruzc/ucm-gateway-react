import React from "react";
import {Route, Routes} from 'react-router-dom';
import PhoneDetails from "./phone-details";
import PhoneManage from "./phone-create-update";
import Phones from "./phones";

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