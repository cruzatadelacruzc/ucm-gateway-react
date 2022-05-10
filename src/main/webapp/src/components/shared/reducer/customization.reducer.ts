import {CONFIG} from "../../../config/constants";
import {AnyAction} from "redux";

export const ACTION_TYPES = {
    SET_MENU : 'customization/SET_MENU',
    MENU_OPEN : 'customization/MENU_OPEN',
    MENU_TOGGLE : 'customization/MENU_TOGGLE',
    SET_FONT_SIZE : 'customization/SET_FONT_SIZE',
    SET_FONT_FAMILY : 'customization/SET_FONT_FAMILY'
};

export const initialState = {
    isOpen: [] as any, // for active default menu
    fontFamily: CONFIG.FONT_FAMILY,
    fontSize: 'small' as 'small' | 'medium'| 'large',
    opened: true
};

export type CustomizationType = Readonly<typeof initialState>;

const customizationReducer = (state: CustomizationType = initialState, {type, payload}: AnyAction): CustomizationType => {
    switch (type) {
        case ACTION_TYPES.MENU_OPEN:
            return {
                ...state,
                isOpen: [payload]
            }
        case ACTION_TYPES.SET_MENU:
            return {
                ...state,
                opened: payload
            }
        case ACTION_TYPES.SET_FONT_FAMILY:
            return {
                ...state,
                fontFamily: payload
            }
        case ACTION_TYPES.SET_FONT_SIZE:
            return {
                ...state,
                fontSize: payload
            }
        default:
            return state;
    }
}

//Actions

export const setMenu = (opened: boolean) => dispatch => {
    return dispatch({
        type: ACTION_TYPES.SET_MENU,
        payload: opened
    })
}

export const menuOpen = (id: string) => dispatch => {
    return dispatch({
        type: ACTION_TYPES.MENU_OPEN,
        payload: id
    })
}

export const setFontSize = (size: 'small' | 'medium'| 'large') => dispatch => {
    return dispatch({
        type: ACTION_TYPES.SET_FONT_SIZE,
        payload: size
    })
}

export default customizationReducer;