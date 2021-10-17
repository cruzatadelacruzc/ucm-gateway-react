import auth, {AuthStateType} from "./authenticate";
import search, {SearchStateType} from "../../module/directory/search-result.reducer";
import {combineReducers} from "redux";
import nomenclature, {NomenclatureStateType} from "../../module/dashboard/nomenclature/nomenclature.reducer";
import workPlace, {WorkplaceStateType} from "../../module/dashboard/workplace/workplace.reducer";
import employee, {EmployeeStateType} from "../../module/dashboard/person/employee/employee.reducer";


export interface IRootState {
    readonly auth: AuthStateType
    readonly search: SearchStateType,
    readonly employee: EmployeeStateType,
    readonly workPlace: WorkplaceStateType,
    readonly nomenclature: NomenclatureStateType
}

const rootReducer = combineReducers<IRootState>({
    nomenclature,
    workPlace,
    employee,
    search,
    auth
})


export default rootReducer;