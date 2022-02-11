import React from 'react';
import {ACTION_TYPES, apiUrl} from "./phone.reducer";
import {useTranslation} from "react-i18next";
import {Button, FormControlLabel, Switch} from "@mui/material";
import UCMDataBase from "../../../shared/components/datatable";
import axios from "axios";
import toast from "../../../shared/util/notification-snackbar.util";
import {Link} from "react-router-dom";

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
                    const _id = tableMeta.rowData?.length > 0 && tableMeta.rowData[0]
                    const _label = value ? t('positive') : "NO";
                    return <FormControlLabel
                            label={_label}
                            control={
                                <Switch color="primary" checked={value}
                                        onChange={(event, checked) => {
                                            setChangeStatus({id: _id, status: checked});
                                        }}/>
                            }
                        />
                }
            }
        },
        {
            name: "employeeName",
            label: t("employee"),
            options: {
                customBodyRender: (value, tableMeta) => {
                    const _employeeId = tableMeta.rowData?.length > 0 && tableMeta.rowData[6]
                    return _employeeId ?
                        <Button variant="text" component={Link} to={`/employee/show/${_employeeId}`}>{value}</Button> :
                        ''
                }
            }
        },
        {
            name: "workPlaceName",
            label: t("workPlace"),
            options: {
                customBodyRender: (value, tableMeta) => {
                    const _workplaceId = tableMeta.rowData?.length > 0 && tableMeta.rowData[7]
                    return _workplaceId ?
                        <Button variant="text" component={Link} to={`/workplace/show/${_workplaceId}`}>{value}</Button> :
                        ''
                }
            }
        },
        {
            name: "description",
            label: t("description")
        },
        {
            name: "employeeId",
            options: {
                display: 'excluded',
                print: false,
                filter: false,
                download: false,
                searchable: false
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
            sortOrderState={{name: 'createdDate', direction: 'desc'}}
            downloadFilename={t("title.list")}
            reduxAction={ACTION_TYPES.FETCH_PHONE_FILTERED}
        />
    );
};

export default Phones;