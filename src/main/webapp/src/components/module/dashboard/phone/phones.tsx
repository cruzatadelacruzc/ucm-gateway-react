import React from 'react';
import {ACTION_TYPES, apiUrl} from "./phone.reducer";
import {useTranslation} from "react-i18next";
import {FormControlLabel, Switch} from "@material-ui/core";
import UCMDataBase from "../../../shared/components/datatable";
import axios from "axios";
import toast from "../../../shared/notification-snackbar.util";

const Phones = () => {
    const {t} = useTranslation(['phone']);
    type ChangeStatusType = {id: string,status: boolean}
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
            name: "number",
            label: t("number")
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
                    const _id = tableMeta.currentTableData?.length > 0 && tableMeta.currentTableData[0].data[0]
                    return (
                        <FormControlLabel
                            label={value ? t('positive') : 'NO'}
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
            name: "employee.name",
            label: t("employee")
        },
        {
            name: "workPlace.name",
            label: t("workPlace")
        },
        {
            name: "description",
            label: t("description")
        },
    ], [status]);  // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <UCMDataBase
            columns={_columns}
            resourceURL='services/directory/api/phones'
            modalDelete={{
                keyDeleteText: "phone:delete.question",
                keyDeleteTextTitle: "phone:delete.title",
                columnIndex: 1
            }}
            sortOrderState={{name: 'number', direction: 'asc'}}
            downloadFilename={t("title.list")}
            reduxAction={ACTION_TYPES.FETCH_PHONE_FILTERED}
        />
    );
};

export default Phones;