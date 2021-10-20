import React from 'react';
import {useTranslation} from "react-i18next";
import UCMDataBase from "../../../shared/components/datatable";
import {ACTION_TYPES} from "../person/employee/employee.reducer";
import {Chip} from "@material-ui/core";

function WorkPlaces() {
    const {t} = useTranslation(['workplace']);

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
            name: "name",
            label: t("name")
        },
        {
            name: "email",
            label: t("email")
        },
        {
            name: "active",
            label: t("active"),
            options: {
                print: false,
                filter: false,
                download: false,
                searchable: false,
                customBodyRender: (value) => {
                    return <Chip variant="default" label={value ? t("positive"): "NO"}/>
                }
            }
        },
        {
            name: "description",
            label: t("description")
        },
    ];

    return (
        <>
            <UCMDataBase
                columns={_columns}
                resourceURL='services/directory/api/workplaces'
                modalDelete={{
                    keyDeleteText: "workplace:delete.question",
                    keyDeleteTextTitle: "workplace:delete.title",
                    columnIndex: 1
                }}
                sortOrderState={{name: 'name', direction: 'asc'}}
                downloadFilename={t("title.list")}
                reduxAction={ACTION_TYPES.FETCH_EMPLOYEE_FILTERED}
            />
        </>
    )
}

export default WorkPlaces;