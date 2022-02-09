import React from "react";
import {useTranslation} from "react-i18next";
import UCMDataBase from "../../../../shared/components/datatable";
import {ACTION_TYPES} from "./employee.reducer";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

const Employees = () => {
    const {t} = useTranslation(['employee']);

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
            name: "registerNumber",
            label: t("registerNumber"),
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
            name: "salary",
            label: t("salary"),
            options: {
                display: false
            }
        },
        {
            name: 'specialtyName',
            label: t("person:specialty")
        },
        {
            name: 'workPlaceName',
            label: t("workPlace"),
            options: {
                customBodyRender: (value, tableMeta) => {
                    const _workplaceId = tableMeta.rowData?.length > 0 && tableMeta.rowData[9]
                    return _workplaceId ?
                        <Button variant="text" component={Link} to={`/workplace/show/${_workplaceId}`}>{value}</Button> :
                        ''
                }
            }
        },
        {
            name: "workPlaceId",
            options: {
                display: 'excluded',
                print: false,
                filter: false,
                download: false,
                searchable: false
            }
        },
    ];

    return (
        <>
            <UCMDataBase
                columns={_columns}
                resourceURL='services/directory/api/employees'
                modalDelete={{
                    keyDeleteText: "employee:delete.question",
                    keyDeleteTextTitle: "employee:delete.title",
                    columnIndex: 4
                }}
                sortOrderState={{name: 'createdDate', direction: 'desc'}}
                downloadFilename={t("title.list")}
                reduxAction={ACTION_TYPES.FETCH_EMPLOYEE_FILTERED}
            />
        </>
    )
}

export default Employees