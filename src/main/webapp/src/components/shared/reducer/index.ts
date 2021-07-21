import auth , {AuthStateType} from "./authenticate";
import search, {SearchStateType} from "../../module/directory/search-result.reducer";
import {combineReducers} from "redux";


export interface IRootState {
    readonly auth: AuthStateType
    readonly search: SearchStateType
}

const rootReducer = combineReducers<IRootState>({
    search,
    auth
})


export default rootReducer;