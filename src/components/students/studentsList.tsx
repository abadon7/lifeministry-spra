import React, { useContext } from "react";
import clsx from "clsx";
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
/* import Checkbox from '@material-ui/core/Checkbox'; */
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import { IStudent } from "../../types/ministry.types";
import StudentsModal from "./stdModal";
import { FormControlLabel, Switch, Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { LifeMinistryContext } from "../../App";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array: any[], comparator: (a: any, b: any) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [any, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof IStudent;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  { id: "id", numeric: false, disablePadding: false, label: "Núm" },
  { id: "name", numeric: false, disablePadding: false, label: "Nombre" },
  { id: "gender", numeric: false, disablePadding: false, label: "Género" },
  { id: "cel", numeric: true, disablePadding: false, label: "Celular" },
  { id: "active", numeric: true, disablePadding: false, label: "Activo" },
  {
    id: "last",
    numeric: true,
    disablePadding: false,
    label: "Última Asignación",
  },
  //{ id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IStudent
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    classes,
    /* onSelectAllClick, */ order,
    orderBy,
    /* numSelected, rowCount, */ onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof IStudent) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell> */}
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === "light"
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: "1 1 100%",
    },
  })
);

interface EnhancedTableToolbarProps {
  numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Estudiantes
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    fab: {
      right: 16,
      bottom: 16,
      position: "fixed",
    },
  })
);

interface Props {
  data: IStudent[];
}

const StudentsTable = (props: Props) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof IStudent>("name");
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = props.data;
  const [openModal, setOpenModal] = React.useState<boolean>(false);
  const [modalData, setModalData] = React.useState({ mode: "new", id: 0 });
  const db: any = useContext(LifeMinistryContext);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof IStudent
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    console.log("Editing " + id);
    setModalData({
      mode: "edit",
      id: id,
    });
    clickOpenModal();
    //const selectedIndex = selected.indexOf(name);
    //console.log(selectedIndex);
    //  let newSelected: string[] = [];

    //  if (selectedIndex === -1) {
    //      newSelected = newSelected.concat(selected, name);
    //  } else if (selectedIndex === 0) {
    //      newSelected = newSelected.concat(selected.slice(1));
    //  } else if (selectedIndex === selected.length - 1) {
    //      newSelected = newSelected.concat(selected.slice(0, -1));
    //  } else if (selectedIndex > 0) {
    //      newSelected = newSelected.concat(
    //          selected.slice(0, selectedIndex),
    //          selected.slice(selectedIndex + 1),
    //      );
    //  }

    //  setSelected(newSelected);
  };

  const openAddModal = () => {
    console.log("Adding new Student");
    setModalData({
      mode: "new",
      id: 0,
    });
    clickOpenModal();
  };

  const clickOpenModal = () => {
    setOpenModal(true);
  };

  const clickCloseModal = () => {
    setOpenModal(false);
  };

  const sendStudentInfo = (data: IStudent[]): boolean => {
    console.log(data);
    //let method: string = "POST"
    //let finalData: IStudent[] | IStudent = data;
    if (modalData.mode === "edit") {
      //method = "PUT"
      //finalData = data[0];
      return db.updateStudent(data[0]);
    } else {
      return db.addStudents(data);
    }
    //const dataUrl = "http://localhost:8000/students";
    //const result = fetchData(dataUrl, finalData, method);
    /* if (result) {
            return true
        } */
    //return false
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
            stickyHeader
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(props.data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell> */}
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal"
                      >
                        {index}
                      </TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell align="center">{row.gender}</TableCell>
                      <TableCell align="right">{row.cel}</TableCell>
                      <TableCell align="right">{row.active}</TableCell>
                      <TableCell align="right">{row.last}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Compacto"
      />
      <StudentsModal
        open={openModal}
        id={modalData.id}
        handleClose={clickCloseModal}
        sendStudentData={sendStudentInfo}
      />
      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={openAddModal}
      >
        <AddIcon />
      </Fab>
    </div>
  );
};

export default StudentsTable;