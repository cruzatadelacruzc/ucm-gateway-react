import React from 'react';
import {useTranslation} from "react-i18next";
import {ACTION_TYPES} from "./student.reducer";
import UCMDataBase from "../../../../shared/components/datatable";

const Students = () => {
    const {t} = useTranslation(['student']);

    const _columns = [
        {
            name: "id",
            options: {
                display: 'excluded',
                print: false,
                filter: false,
                download: false,
                searchable: false
            }
        },
        {
            name: "ci",
            label: t("person:ci"),
        },
        {
            name: "email",
            label: t("person:email"),
            options: {
                display: false
            }
        },
        {
            name: "name",
            label: t("person:name")
        },
        {
            name: "firstLastName",
            label: t("person:firstLastName"),
            options: {
                display: false
            }
        },
        {
            name: "secondLastName",
            label: t("person:secondLastName"),
            options: {
                display: false
            }
        },
        {
            name: 'specialtyName',
            label: t("person:specialty")
        },
        {
            name: "classRoom",
            label: t("classRoom"),
        },
        {
            name: "residence",
            label: t("residence"),
        },
        {
            name: "studyCenterName",
            label: t("studyCenter"),
            options: {
                display: false
            }
        },
        {
            name: "kindName",
            label: t("kind"),
            options: {
                display: false
            }
        },
    ];

    return (
        <UCMDataBase
            columns={_columns}
            resourceURL='services/directory/api/students'
            modalDelete={{
                keyDeleteText: "student:delete.question",
                keyDeleteTextTitle: "student:delete.title",
                columnIndex: 3
            }}
            sortOrderState={{name: 'createdDate', direction: 'desc'}}
            downloadFilename={t("title.list")}
            reduxAction={ACTION_TYPES.FETCH_STUDENT_FILTERED}
        />
    );
};

export default Students;