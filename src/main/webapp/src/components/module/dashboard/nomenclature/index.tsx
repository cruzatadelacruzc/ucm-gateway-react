import React, {lazy} from 'react'
import {Route, Routes} from 'react-router-dom';
import Nomenclature from "./nomenclature";

const NomenclatureManage = lazy( () => import("./nomenclature-create-update"));

export default function NomenclatureRouter() {
    return (
        <Routes>
            <Route path='/' element={<Nomenclature/>}/>
            <Route path='add' element={<NomenclatureManage/>}/>
            <Route path='edit/:id' element={<NomenclatureManage/>}/>
        </Routes>
    )
}