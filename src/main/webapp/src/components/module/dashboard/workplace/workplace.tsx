import React from 'react';
import {useTranslation} from "react-i18next";
import UCMDataBase from "../../../shared/components/datatable";
import {ACTION_TYPES, apiUrl} from "./workplace.reducer";
import {FormControlLabel, Switch} from "@mui/material";
import axios from "axios";
import toast from "../../../shared/util/notification-snackbar.util";

type ChangeStatusType = {
    id: string,
    status: boolean
}
function WorkPlaces() {
    const {t} = useTranslation(['workplace']);
    const [status, setStatus] = React.useState(false);
    const [changeStatus, setChangeStatus] = React.useState<ChangeStatusType>({id:'',status: false});

    React.useEffect(() => {
        (async (changeStatus: ChangeStatusType) => {
            try {
                if (changeStatus.id !== '') {
                    const response = await axios.put(`${apiUrl}/status`, changeStatus)
                    setStatus(prevState => response.data ? !prevState : prevState)
                }
            } catch (error) {
                toast.error(t(error.message))
            }
        })(changeStatus)

    }, [changeStatus]) // eslint-disable-line react-hooks/exhaustive-deps

    const _columns = React.useMemo(() => [
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
                customBodyRender: (value, tableMeta) => {
                    const _id = tableMeta.rowData?.length > 0 && tableMeta.rowData[0]
                    const _label = value ? t('positive') : "NO";
                    return (
                        <FormControlLabel
                            label={_label}
                            control={
                                <Switch color="primary" checked={value}
                                        onChange={(event, checked) => {
                                            setChangeStatus({id: _id, status: checked});
                                        }}/>
                            }
                        />
                    )
                }
            }
        },
        {
            name: "description",
            label: t("description")
        },
    ], [status]);  // eslint-disable-line react-hooks/exhaustive-deps

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
                sortOrderState={{name: 'createdDate', direction: 'desc'}}
                downloadFilename={t("title.list")}
                reduxAction={ACTION_TYPES.FETCH_WORKPLACE_FILTERED}
            />
        </>
    )
}

export default WorkPlaces;