import {createSelectorCreator, defaultMemoize} from 'reselect'
import isEqual from 'lodash.isequal'
import {CONFIG} from "../../../config/constants";


// create a "selector creator" that uses lodash.isequal instead of ===
export const createDeepEqualSelector = createSelectorCreator(defaultMemoize, isEqual)
/**
 * Check if the passed object is a promise
 * @param value the object to check
 */
export const isPromise = (value): boolean => {
    if (value !== null && typeof value === 'object') {
        return value && typeof value.then === 'function';
    }
    return false;
};

export const buildAvatarURL = (fileName: string): string => {
    if (fileName !== '') {
        const serviceURL = 'api/files/avatar'.replace("avatar", fileName);
        return CONFIG.SERVER_API_URL?.endsWith("/") ? CONFIG.SERVER_API_URL + serviceURL : CONFIG.SERVER_API_URL + "/" + serviceURL;
    }
    return '';
}

export const isObjectWithKey = <T extends string>( given: unknown,key: T ):
    given is Partial<Record<T, unknown>> => typeof given === 'object' && given !== null && key in given