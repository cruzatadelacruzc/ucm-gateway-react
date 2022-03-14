import React from "react";
import {Route, Routes} from 'react-router-dom';
import StudentDetails from "./student-details";
import StudentManage from "./student-create-update";
import Students from "./students";

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