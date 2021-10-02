import React, {useEffect} from "react";
import {Link, useRouteMatch} from 'react-router-dom'
import {useTranslation} from "react-i18next";
import {IRootState} from "../../../shared/reducer";
import Widget from "../../../shared/layout/widget";
import {useDispatch, useSelector} from "react-redux";
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
} from "@material-ui/core";
import {dataTableStyles, managerSectionStyles} from "../style";
import {Add, Close as CloseIcon, Search as SearchIcon} from "@material-ui/icons";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {deleteNomenclature, getNomenclatures, getSearchNomenclatures} from "./nomenclature.reducer";
import MUIDataTable from "mui-datatables";
import {ITEMS_PER_PAGE} from "../../../../config/constants";
import {ICustomToolbarSelectProps} from "../../../types";
import theme from "../../../../theme";

const Nomenclature = () => {
    let match = useRouteMatch<{ url: string }>();
    const dispatch = useDispatch();
    const classes = managerSectionStyles();
    const dataTableClasses = dataTableStyles();
    const {t} = useTranslation(['nomenclature']);
    const [currentPage, setCurrentPage] = React.useState(0);
    const [numberOfRows, setNumberOfRows] = React.useState(ITEMS_PER_PAGE);
    const [search, setSearch] = React.useState('');
    const [modalOpen, setModalOpen] = React.useState(false);
    const {page, size, totalItems, entities, updateSuccess, loading} = useSelector((states: IRootState) => states.nomenclature);
    const [sortOrder, setSortOrder] = React.useState<{ name: string, direction: string }>({
        name: 'name',
        direction: 'asc'
    })

    useEffect(() => {
        if (search) {
            dispatch(getSearchNomenclatures(search, currentPage, numberOfRows, `${sortOrder.name},${sortOrder.direction}`))
        } else {
            dispatch(getNomenclatures(currentPage, numberOfRows, `${sortOrder.name},${sortOrder.direction}`))
        }
    }, [search, currentPage, numberOfRows, sortOrder, dispatch, updateSuccess])

    const handleClickOpen = () => {
        setModalOpen(true);
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    const removeNomenclature = (id: string) => {
        dispatch(deleteNomenclature(id))
        setModalOpen(false)
    }

    const CustomToolbar = ({displayData, selectedRows}: ICustomToolbarSelectProps) => {
        const isFullScreen = useMediaQuery(theme.breakpoints.down('sm'));
        const id = displayData[parseInt(Object.keys(selectedRows.lookup)[0], 10)]?.data[0] || ''
        const param = displayData[parseInt(Object.keys(selectedRows.lookup)[0], 10)]?.data[1] || ''
        return (
            <>
                <Paper elevation={1} className={dataTableClasses.paper}>
                    <Tooltip title={t("common:edit") || "Editar"} aria-label={t("common:edit")} arrow>
                        <IconButton
                            component={Link}
                            to={`${match.url}/edit/${id}`}
                            aria-label={t("common:edit")}
                            color="primary"
                            size="small"
                            className={dataTableClasses.iconButton}
                        >
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={t("common:show") || "Mostrar"} aria-label={t("common:show")} arrow>
                        <IconButton
                            component={Link}
                            to={`${match.url}/show/${id}`}
                            aria-label={t("common:show")}
                            color="primary"
                            size="small"
                            className={dataTableClasses.iconButton}
                        >
                            <VisibilityIcon/>
                        </IconButton>
                    </Tooltip>
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
                </Paper>
                <Dialog
                    open={modalOpen}
                    onClose={handleClose}
                    fullScreen={isFullScreen}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title"> {t('delete.title')}</DialogTitle>
                    <IconButton aria-label="close" className={dataTableClasses.closeButton} onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {t('delete.question', {param: param})}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            {t('common:cancel')}
                        </Button>
                        <Button onClick={() => removeNomenclature(id)} color="primary" autoFocus>
                            {t('common:accept')}
                        </Button>
                    </DialogActions>
                </Dialog>
            </>
        )
    }

    const columns = [
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
            name: 'parentDistrictName',
            label: t("parentDistrict")
        },
        {
            name: 'description',
            label: t("description")
        },
    ];

    const options = {
        page: page,
        filter: false,
        search: false,
        serverSide: true,
        count: totalItems,
        rowsPerPage: size,
        responsive: 'standard',
        tableBodyHeight: '400px',
        selectableRows: 'single',
        rowsPerPageOptions: [20, 50, 100],
        draggableColumns: {enabled: true},
        downloadOptions: {filename: t("title.list") + ".csv"},
        onChangePage: (currentPage: number) => setCurrentPage(currentPage),
        onChangeRowsPerPage: (numberOfRows: number) => setNumberOfRows(numberOfRows),
        textLabels: t("datatable:textLabels", {returnObjects: true, numberPage: currentPage}),
        onColumnSortChange: (name: string, direction: string) => setSortOrder({...sortOrder, name, direction})
    };
    return (
        <Widget title={t("title.list")} disableWidgetMenu>
            <div>
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
                        to={`${match.url}/add`}
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
                        data={entities}
                        columns={columns}
                        options={options}
                        components={{
                            TableToolbarSelect: CustomToolbar
                        }}
                    />
                    {/*<UCMDataBase*/}
                    {/*    data={nomenclature.entities}*/}
                    {/*    options={options}*/}
                    {/*    columns={columns}*/}
                    {/*    modalDelete={{*/}
                    {/*        keyDeleteText: "nomenclature:delete.question",*/}
                    {/*        keyDeleteTextTitle: "nomenclature:delete.title",*/}
                    {/*        columnIndex: 1*/}
                    {/*    }}*/}
                    {/*    pageState={page}*/}
                    {/*    sizeState={size}*/}
                    {/*    sortOrderState={sortOrder}*/}
                    {/*    handleSearchItems={getSearchNomenclatures}*/}
                    {/*    handleGetAllItems={getNomenclatures}*/}
                    {/*/>*/}
                </div>
            </div>
        </Widget>
    )
}

export default Nomenclature;