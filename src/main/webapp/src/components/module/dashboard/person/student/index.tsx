import React, {lazy} from "react";
import {Route, Routes} from 'react-router-dom';
import Students from "./students";

const StudentManage = lazy( () => import('./student-create-update'));
const StudentDetails = lazy( () => import('./student-details'));

export default function StudentRouter() {
    return (
        <Routes>
            <Route  path='/' element={<Students/>}/>
            <Route  path='add' element={<StudentManage/>}/>
            <Route  path='show/:id' element={<StudentDetails/>}/>
            <Route  path='edit/:id' element={<StudentManage/>}/>
        </Routes>
    )
}