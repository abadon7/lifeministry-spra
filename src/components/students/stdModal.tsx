import React, { useContext, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
//import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Snackbar,
  Switch,
} from "@material-ui/core";
import { LifeMinistryContext } from "../../App";
import InputAdornment from "@material-ui/core/InputAdornment";
import AccountCircle from "@material-ui/icons/AccountCircle";
import PhoneIcon from "@material-ui/icons/Phone";
import { IStudent } from "../../types/ministry.types";
import MuiAlert, { AlertProps, Color } from "@material-ui/lab/Alert";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const initialData: IStudent[] = [
  {
    id: 0,
    name: "",
    gender: "f",
    cel: 0,
    active: true,
    notes: "Estudiante nuevo",
    last: new Date("01/01/21").toISOString(),
    lastpartner: 0,
  },
];

interface Props {
  open: boolean;
  id: number;
  handleClose: any;
  sendStudentData: Function;
}

const StudentsModal: React.FC<Props> = ({
  open,
  id,
  handleClose,
  sendStudentData,
}) => {
  //const [open, setOpen] = React.useState(false);

  const [stdData, setStdData] = React.useState<IStudent[]>(initialData);
  //const handleClickOpen = () => {
  //  setOpen(true);
  //};

  //const handleClose = () => {
  //  setOpen(false);
  //};

  const handleStudentsEdit = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.name);
    const keyName = event.target.name;
    let value: string | number | boolean = event.target.value;
    if (keyName === "cel") {
      value = parseInt(value);
    }
    if (keyName === "active") {
      value = event.target.checked;
    }
    setStdData([
      {
        ...stdData[0],
        [keyName]: value,
      },
    ]);
  };

  const sendStdData = (): void => {
    const result = sendStudentData(stdData);
    result.then(() => {
      //setOpenAlertInfo({
      //  open: true,
      //  type: "success",
      //  message: "Guardado exitoso",
      //});
      setOpenAlertInfo({ ...openAlertInfo, open: true });
    });
  };

  const db: any = useContext(LifeMinistryContext);
  //const classes = useStyles();
  const alertInfo = {
    open: false,
    type: "success",
    message: "Guardado exitoso",
  };

  const [openAlertInfo, setOpenAlertInfo] = React.useState(alertInfo);

  // const handleClick = () => {
  //   setOpen(true);
  // };

  const handleCloseAlert = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlertInfo(alertInfo);
  };

  useEffect(() => {
    if (id !== 0) {
      console.log("Editando un estudiante");
      console.log(
        db.getStudent(id).then((res: IStudent[]) => {
          console.log(res);
          setStdData(res);
        })
      );
    }
  }, [db, id]);
  return (
    <div>
      {/*<Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Nuevo
      </Button>*/}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Estudiante
          <FormControlLabel
            style={{ float: "right" }}
            control={
              <Switch
                checked={stdData[0].active}
                onChange={handleStudentsEdit}
                name="active"
              />
            }
            label={stdData[0].active ? "Activo" : "Inactivo"}
          />
        </DialogTitle>
        <DialogContent>
          {/*<DialogContentText></DialogContentText>*/}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            name="name"
            label="Nombre"
            type=""
            fullWidth
            value={stdData[0].name}
            onChange={handleStudentsEdit}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
          />
          <FormLabel component="legend">Género</FormLabel>
          <RadioGroup
            row
            aria-label="gender"
            name="gender"
            value={stdData[0].gender}
            onChange={handleStudentsEdit}
          >
            <FormControlLabel value="f" control={<Radio />} label="Mujer" />
            <FormControlLabel value="m" control={<Radio />} label="Hombre" />
          </RadioGroup>
          <TextField
            margin="dense"
            id="note"
            name="notes"
            label="Notas"
            type=""
            fullWidth
            multiline
            rows={4}
            value={stdData[0].notes}
            onChange={handleStudentsEdit}
            variant="outlined"
          />
          <TextField
            margin="dense"
            id="cel"
            name="cel"
            label="Celular"
            type="number"
            fullWidth
            value={stdData[0].cel}
            onChange={handleStudentsEdit}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
          {/*<FormControlLabel
            control={
              <Switch
                checked={stdData[0].active}
                onChange={handleChangeActive}
                name="checkedA"
              />
            }
            label="Activo"
          />*/}
          <Snackbar
            open={openAlertInfo.open}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
          >
            <Alert
              onClose={handleCloseAlert}
              severity={openAlertInfo.type as Color}
            >
              {openAlertInfo.message}
            </Alert>
          </Snackbar>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={sendStdData} color="primary">
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default StudentsModal;
