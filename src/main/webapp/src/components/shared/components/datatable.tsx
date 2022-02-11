import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    InputBase,
    LinearProgress,
    Paper,
    Tooltip,
    useMediaQuery
} from "@mui/material";
import {Link, useRouteMatch} from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import {Add, Close as CloseIcon, Search as SearchIcon} from "@mui/icons-material";
import React from "react";
import {dataTableStyles, managerSectionStyles} from "./style";
import {useTranslation} from "react-i18next";
import MUIDataTable from "mui-datatables";
import {ITEMS_PER_PAGE} from "../../../config/constants";
import axios from "axios";
import {useDispatch} from "react-redux";
import {FAILURE, REQUEST, SUCCESS} from "../reducer/action-type.util";
import toast from "../util/notification-snackbar.util";
import theme from "../../../theme";

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
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const classes = managerSectionStyles();
    const dataTableClasses = dataTableStyles();
    let match = useRouteMatch<{ url: string }>();
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

    const handleClose = () => {
        setModalOpen(false);
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
        const isFullScreen = useMediaQuery(theme.breakpoints.down('md'));
        const id = displayData[parseInt(Object.keys(selectedRows.lookup)[0], 10)]?.data[0] || ''
        const param = displayData[parseInt(Object.keys(selectedRows.lookup)[0], 10)]?.data[modalDelete.columnIndex] || ''
        return <>
            <Paper elevation={1} className={dataTableClasses.paper}>
                {!disableEditButton &&
                    <Tooltip title={t("common:edit") || "Editar"} aria-label={t("common:edit")} arrow>
                        <IconButton
                            component={Link}
                            to={`${match.url}${editRoute || '/edit'}/${id}`}
                            aria-label={t("common:edit")}
                            color="primary"
                            size="small"
                            className={dataTableClasses.iconButton}
                        >
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                }
                {!disableShowButton &&
                    <Tooltip title={t("common:show") || "Mostrar"} aria-label={t("common:show")} arrow>
                        <IconButton
                            component={Link}
                            to={`${match.url}${showRoute || '/show'}/${id}`}
                            aria-label={t("common:show")}
                            color="primary"
                            size="small"
                            className={dataTableClasses.iconButton}
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
                            className={dataTableClasses.iconButton}
                        >
                            <DeleteIcon/>
                        </IconButton>
                    </Tooltip>
                }
            </Paper>
            <Dialog
                open={modalOpen}
                onClose={handleClose}
                fullScreen={isFullScreen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title"> {t(modalDelete.keyDeleteTextTitle)}</DialogTitle>
                <IconButton
                    aria-label="close"
                    className={dataTableClasses.closeButton}
                    onClick={handleClose}
                    size="large">
                    <CloseIcon/>
                </IconButton>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {t(modalDelete.keyDeleteText, {param: param})}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {t('common:cancel')}
                    </Button>
                    <Button onClick={() => removeItem(id)} color="primary" autoFocus>
                        {t('common:accept')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>;
    }

    return (
        <>
            <div className={classes.container}>
                <Paper elevation={1} className={classes.paper}>
                    <div className={classes.form}>
                        <InputBase
                            type='search'
                            autoFocus
                            className={classes.input}
                            placeholder={t('header:placeholder')}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
                            value={search}
                            inputProps={{'aria-label': t('header:placeholder').toLowerCase()}}
                        />
                        <div className={classes.iconButton} aria-label='search'>
                            <SearchIcon/>
                        </div>
                    </div>
                </Paper>
                <Button
                    color="primary"
                    variant="contained"
                    className={classes.buttonAdd}
                    component={Link}
                    to={`${match.url}${addRoute || '/add'}`}
                    endIcon={<Add/>}
                >
                    {t('common:add')}
                </Button>
            </div>
            <div>
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
            </div>
        </>
    );
}