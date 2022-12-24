import React, {lazy} from 'react'
import {Route, Routes} from 'react-router-dom';
import Employees from "./employee";

const EmployeeManage = lazy( () => import('./employee-create-update'));
const EmployeeDetails = lazy( () => import('./employee-details'));

export default function EmployeeRouter() {
    return (
        <Routes>
            <Route path='/' element={<Employees/>}/>
            <Route path='add' element={<EmployeeManage/>}/>
            <Route path='edit/:id' element={<EmployeeManage/>}/>
            <Route path='show/:id' element={<EmployeeDetails/>}/>
        </Routes>
    )
}