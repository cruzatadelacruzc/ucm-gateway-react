import React from "react";
import {useTranslation} from "react-i18next";
import UCMDataBase from "../../../shared/components/datatable";
import {ACTION_TYPES} from "./nomenclature.reducer";

const Nomenclature = () => {
    const {t} = useTranslation(['nomenclature']);

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
            label: t("name"),
        },
        {
            name: 'discriminator',
            label: t("discriminator"),
        },
        {
            name: 'description',
            label: t("description")
        },
    ];

    return (
        <UCMDataBase
            columns={_columns}
            disableShowButton
            resourceURL='services/directory/api/nomenclatures'
            modalDelete={{
                keyDeleteText: "nomenclature:delete.question",
                keyDeleteTextTitle: "nomenclature:delete.title",
                columnIndex: 1
            }}
            sortOrderState={{name: 'createdDate', direction: 'desc'}}
            downloadFilename={t("title.list")}
            reduxAction={ACTION_TYPES.FETCH_NOMENCLATURE_FILTERED}
        />
    )
}

export default Nomenclature;