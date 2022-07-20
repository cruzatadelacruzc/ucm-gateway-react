import {Box, Button, IconButton, InputBase, LinearProgress, Paper, Tooltip} from "@mui/material";
import {Link} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import {useTranslation} from "react-i18next";
import MUIDataTable from "mui-datatables";
import {ITEMS_PER_PAGE} from "../../../config/constants";
import axios from "axios";
import {useDispatch} from "react-redux";
import {FAILURE, REQUEST, SUCCESS} from "../reducer/action-type.util";
import toast from "../util/notification-snackbar.util";
import useTheme from "@mui/material/styles/useTheme";
import InputAdornment from "@mui/material/InputAdornment";
import DialogDelete from "./dialog-delete";

export interface IUCMDataBase {
    addRoute?: string,
    editRoute?: string,
    showRoute?: string,
    deleteRoute?: string,
    disableShowButton?,
    disableDeleteButton?,
    disableEditButton?,
    customOptions?: {},
    columns: Array<{ name: string, label?: string, options?: {} }>,
    resourceURL: string,
    reduxAction?: string,
    downloadFilename?: string,
    modalDelete: {
        keyDeleteText: string,
        keyDeleteTextTitle: string,
        columnIndex: number
    },
    sortOrderState: { name: string, direction: string },
}

export interface ICustomToolbarSelectProps {
    components: { TableToolbarSelect: (props) => void }
    displayData: [{ data: Array<any>, dataIndex: number }],
    onRowsDelete: () => void,
    options: {}
    selectRowUpdate: (e, i) => void
    selectedRows: { lookup: { dataIndex: boolean }, data: Array<{ index: number, dataIndex: number }> }
}

export default function UCMDataBase(
    {
        columns,
        addRoute,
        editRoute,
        showRoute,
        deleteRoute,
        modalDelete,
        resourceURL,
        reduxAction,
        customOptions,
        sortOrderState,
        downloadFilename,
        disableEditButton,
        disableShowButton,
        disableDeleteButton
    }: IUCMDataBase
) {
    const theme = useTheme();
    const {t} = useTranslation(['datatable']);
    const dispatch = useDispatch();
    const [items, setItems] = React.useState([]);
    const [search, setSearch] = React.useState('');
    const [update, setUpdate] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [totalItems, setTotalItems] = React.useState(0);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [numberOfRows, setNumberOfRows] = React.useState(ITEMS_PER_PAGE);
    const [_rowsSelected, setRowsSelected] = React.useState<Array<number>>([]);
    const [sortOrder, setSortOrder] = React.useState<{ name: string, direction: string }>(sortOrderState)


    React.useEffect(() => {
        (async () => {
            try {
                let searchURl = `${resourceURL}/filtered/or?`;
                if (search) {
                    for (let i = 1; i < columns.length; i++) {
                        searchURl += `${columns[i].name}.contains=${search}&`
                    }
                }
                setLoading(true);
                if (reduxAction && reduxAction !== '') {
                    dispatch({type: REQUEST(reduxAction)})
                }
                const response = await axios.get(`${searchURl}page=${currentPage}&size=${numberOfRows}&sort=${sortOrder.name},${sortOrder.direction}`);
                const data = response.data
                setLoading(false)
                setItems(data)
                setTotalItems(parseInt(response.headers['x-total-count'], 10))
                setCurrentPage(parseInt(response.headers['x-page'], 10))
                setNumberOfRows(parseInt(response.headers['x-size'], 10))
                if (reduxAction && reduxAction !== '') {
                    dispatch({type: reduxAction, payload: SUCCESS(response)})
                }
            } catch (error) {
                setLoading(false);
                if (reduxAction && reduxAction !== '') {
                    dispatch({type: FAILURE(reduxAction), payload: {data: error.message}})
                }
                toast.error(t(error.message))
            }
        })()
    },[search, currentPage, numberOfRows, sortOrder.name, sortOrder.direction, update, resourceURL, columns, reduxAction]) // eslint-disable-line react-hooks/exhaustive-deps



    const handleClickOpen = () => {
        setModalOpen(true);
    };

    const removeItem = (id: string) => {
        axios.delete(`${deleteRoute ? deleteRoute : resourceURL}/${id}`)
            .then(() => {
                setModalOpen(false)
                setRowsSelected([])
                setUpdate(true)
            })
            .catch(error => {
                setUpdate(false)
                setModalOpen(false)
                toast.error(t(error.message))
            })
    }

    const options = {
        page: currentPage,
        filter: false,
        search: false,
        serverSide: true,
        count: totalItems,
        rowsPerPage: numberOfRows,
        responsive: 'standard',
        tableBodyHeight: '400px',
        selectableRows: 'single',
        rowsPerPageOptions: [20, 50, 100],
        draggableColumns: {enabled: true},
        rowsSelected: _rowsSelected,
        onRowSelectionChange: (p1,p2,rowsSelected: Array<number>) => setRowsSelected(rowsSelected),
        downloadOptions: {filename: `${downloadFilename || 'download'}.csv`},
        onChangePage: (currentPage: number) => setCurrentPage(currentPage),
        onChangeRowsPerPage: (numberOfRows: number) => setNumberOfRows(numberOfRows),
        textLabels: t("datatable:textLabels", {returnObjects: true, numberPage: currentPage}),
        onColumnSortChange: (name: string, direction: string) => setSortOrder({...sortOrder, name, direction})
    };

    const CustomToolbar = ({displayData, selectedRows}: ICustomToolbarSelectProps) => {
        const id = displayData[parseInt(Object.keys(selectedRows.lookup)[0], 10)]?.data[0] || ''
        const param = displayData[parseInt(Object.keys(selectedRows.lookup)[0], 10)]?.data[modalDelete.columnIndex] || ''
        return <>
            <Paper elevation={1} sx={{
                backgroundColor: theme.palette.background.default,
                flex: '1 1 100%',
                display: 'flex',
                position: 'relative',
                justifyContent: 'flex-end',
                zIndex: 120,
                paddingTop: theme.spacing(2),
                paddingBottom: theme.spacing(2),
                [theme.breakpoints.down('sm')]: {
                    justifyContent: 'center',
                }
            }}>
                {!disableEditButton &&
                <Tooltip title={t("common:edit") || "Editar"} aria-label={t("common:edit")} arrow>
                    <IconButton
                        component={Link}
                        to={`${editRoute || 'edit'}/${id}`}
                        aria-label={t("common:edit")}
                        color="primary"
                        size="small"
                        sx={{marginRight: '24px'}}
                    >
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                }
                {!disableShowButton &&
                    <Tooltip title={t("common:show") || "Mostrar"} aria-label={t("common:show")} arrow>
                        <IconButton
                            component={Link}
                            to={`${showRoute || 'show'}/${id}`}
                            aria-label={t("common:show")}
                            color="primary"
                            size="small"
                            sx={{marginRight: '24px'}}
                        >
                            <VisibilityIcon/>
                        </IconButton>
                    </Tooltip>
                }
                {!disableDeleteButton &&
                    <Tooltip title={t("common:delete") || "Eliminar"} aria-label={t("common:delete")} arrow>
                        <IconButton
                            onClick={handleClickOpen}
                            aria-label={t("common:delete")}
                            color="primary"
                            size="small"
                            sx={{marginRight: '24px'}}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                }
            </Paper>
            <DialogDelete
                open={modalOpen}
                setOpen={setModalOpen}
                title={t(modalDelete.keyDeleteTextTitle)}
                deleteItem={() => removeItem(id)}
                content={t(modalDelete.keyDeleteText, {param: param})}
            />
        </>;
    }

    return (
        <>
            <Box sx={{
                width: '100%',
                display: 'flex',
                flexDirection: "row",
                flexWrap: 'wrap',
                marginBottom: theme.spacing(3),
                [theme.breakpoints.down('sm')]: {
                    flexDirection: "column",
                }
            }}>
                <Paper elevation={1} sx={{
                    border: `1px solid ${theme.palette.grey.A200}`,
                    paddingLeft: '8px',
                    flex: '6 6 auto',
                    borderRadius: 50,
                    marginRight: theme.spacing(3),
                    order: 1,
                    [theme.breakpoints.down('sm')]: {
                        order: 2,
                        marginRight: theme.spacing(0),
                        marginBottom: theme.spacing(1)
                    }
                }}>
                    <Box sx={{display: 'flex', width: '100%'}}>
                        <InputBase
                            type='search'
                            autoFocus
                            sx={{width: '100%', borderRadius: 50, padding: 1.5}}
                            placeholder={t('placeholder')}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
                            value={search}
                            endAdornment={<InputAdornment position="start"><SearchIcon/></InputAdornment>}
                            inputProps={{'aria-label': t('placeholder').toLowerCase()}}
                        />
                    </Box>
                </Paper>
                <Button
                    color="primary"
                    variant="contained"
                    sx={{
                        order: 2,
                        flex: '1 1 auto',
                        marginRight: theme.spacing(3),
                        [theme.breakpoints.down('sm')]: {
                            order: 1,
                            marginRight: theme.spacing(0),
                            marginBottom: theme.spacing(1)
                        }
                    }}
                    component={Link}
                    to={`${addRoute || 'add'}`}
                    startIcon={<AddCircleIcon/>}
                >
                    {t('common:add')}
                </Button>
            </Box>
            <Box>
                {loading ?
                    <Box sx={{width: '100%'}}>
                        <LinearProgress/>
                    </Box>
                    : ''}
                <MUIDataTable
                    title={loading ? t('common:loading') : ''}
                    data={items}
                    columns={columns}
                    options={customOptions ? customOptions : options}
                    components={{
                        TableToolbarSelect: (!disableDeleteButton || !disableShowButton || !disableEditButton) && CustomToolbar
                    }}
                />
            </Box>
        </>
    );
}