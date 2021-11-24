import {combineReducers} from "redux";
import auth, {AuthStateType} from "./authenticate";
import phone, {PhoneStateType} from "../../module/dashboard/phone/phone.reducer";
import search, {SearchStateType} from "../../module/directory/search-result.reducer";
import student, {StudentStateType} from "../../module/dashboard/person/student/student.reducer";
import workPlace, {WorkplaceStateType} from "../../module/dashboard/workplace/workplace.reducer";
import employee, {EmployeeStateType} from "../../module/dashboard/person/employee/employee.reducer";
import nomenclature, {NomenclatureStateType} from "../../module/dashboard/nomenclature/nomenclature.reducer";


export interface IRootState {
    readonly auth: AuthStateType
    readonly phone: PhoneStateType,
    readonly search: SearchStateType,
    readonly student: StudentStateType,
    readonly employee: EmployeeStateType,
    readonly workPlace: WorkplaceStateType,
    readonly nomenclature: NomenclatureStateType
}

const rootReducer = combineReducers<IRootState>({
    nomenclature,
    workPlace,
    employee,
    student,
    search,
    phone,
    auth
})


export default rootReducer;