import pick from 'lodash/pick';
import {IEmployee} from "../models/employee.model";
import {IWorkPlace} from "../models/workplace.model";
import {IStudent} from "../models/student.model";

/**
 * Removes fields with an 'id' field that equals ''.
 * This function was created to prevent entities to be sent to
 * the server with an empty id and thus resulting in a 500.
 *
 * @param entity Object to clean.
 */
export const cleanEntity = entity => {
    const keysToKeep = Object.keys(entity).filter(k => !(entity[k] instanceof Object) || (entity[k]['id'] !== '' && entity[k]['id'] !== -1));

    return pick(entity, keysToKeep);
};

export const buildFormData = (entity: IEmployee | IWorkPlace| IStudent, entityName: string, image?: File, avatarName?: string): FormData => {
    cleanEntity(entity)
    const formData = new FormData();
    formData.append(entityName, new Blob([JSON.stringify(entity)], {type: "application/json"}));
    if (image) {
        formData.append(avatarName ? avatarName : "avatar", image)
    }
    return formData;
}