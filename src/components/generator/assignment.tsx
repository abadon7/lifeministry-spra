import React, { useEffect, useState } from "react";
//import { LifeministryContext } from '../App';
//import { IAssignment, WeeksList } from '../types/ministry.types';
import {
  /*  DropdownMenuItemType, */ IDropdownOption,
} from "office-ui-fabric-react/lib/Dropdown";
import {
  /* Checkbox, ChoiceGroup, */ Dropdown,
  getTheme,
  IDropdownStyles,
  /* FontWeights, getTheme, */ /* IChoiceGroupOption, */ /* IStackTokens, */ Label /* , mergeStyleSets */ /* , Stack */,
  mergeStyleSets,
} from "@fluentui/react";
import { IAssignment, WeeksList } from "../../types/ministry.types";
//import { getWeeksFromMonth } from '../../pages/generator';
import { LifeministryContext } from "../../App";
import {
  createStyles,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Select,
  Theme,
} from "@material-ui/core";

const theme = getTheme();
const classNames = mergeStyleSets({
  wrapper: {
    //height: '40vh',
    position: "relative",
    maxHeight: "inherit",
    //width: '45vh',
  },
  pane: {
    maxWidth: 250,
    border: "1px solid " + theme.palette.neutralLight,
    margin: "10px auto",
    padding: 10,
  },
  sticky: {
    //color: theme.palette.neutralDark,
    padding: "5px 20px 5px 10px",
    fontSize: "13px",
    //borderTop: '1px solid ' + theme.palette.black,
    //borderBottom: '1px solid ' + theme.palette.black,
  },
  textContent: {
    padding: "15px 10px",
  },
  checkbox: {
    padding: "5px",
  },
  /* flexDiv: [
        //theme.fonts.xLargePlus,
        {
            flex: '1 1 auto',
            borderTop: '1px solid rgb(149 149 149)',
            //color: theme.palette.neutralPrimary,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            width: "100%"
            //padding: '12px 12px 14px 24px',
        },
    ], */
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

/* const sectionStackTokens: IStackTokens = { childrenGap: 30 };

const toDay: Date = new Date();
const months: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
] */
const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 200, margin: "0 auto" },
};

type tpOptions = {
  [key: string]: string | number | any;
};

interface TimeOpts extends tpOptions {
  week: boolean;
  month: boolean;
}

/* interface AssignmentsSelected extends tpOptions {
    week: boolean;
} */

interface Props {
  //monthsChange: any;
  //weeksChange: any;
  //timeChange: any;
  //timeOpts: TimeOpts;
  stdMonths: string[];
  //stdWeeks: string[];
  fullWeeksList: WeeksList[];
  stdAssigments: any;
  assigmentsChange: any;
  //scheduleWeeks: WeeksList[]
}

//function GeneratorDates() {
const GeneratorAssigments: React.FunctionComponent<Props> = (props: Props) => {
  //const initialData: IAssignment[] = [{ "id": 0, "name": "Initial", "type": "school", "participants": 0 }];
  //const [optSelected, setOptSelected] = useState<string>("");
  //const [weeksSelected, setWeeksSelected] = useState<WeeksList[]>([]);
  const [assgList, setAssgList] = useState<IDropdownOption[]>([
    { key: "lectura", text: "Lectura" },
  ]);
  const db: any = React.useContext(LifeministryContext);
  const [stedAssignments, setstedAssignments] = React.useState({});
  const classes = useStyles();

  //const onChangeAssigment = (
  //  event: React.FormEvent<HTMLDivElement>,
  //  option?: IDropdownOption
  //): void => {
  //  if (option) {
  //    console.log(option);
  //    const ev: HTMLButtonElement = event.target as HTMLButtonElement;
  //    const keySplit: string[] = ev.id.split(":");
  //    let newstedAssignments: tpOptions = { ...props.stdAssigments };
  //    newstedAssignments[keySplit[0] as string].assignmentsIds[keySplit[1]] =
  //      option.key;
  //    setstedAssignments(newstedAssignments);
  //    props.assigmentsChange(newstedAssignments);

  //    /* setSelectedKeys(
  //            item.selected ? [...selectedKeys, item.key as string] : selectedKeys.filter(key => key !== item.key),
  //          ); */
  //  }
  //};

  const optionSelected = (selector: string) => {
    console.log("Checking " + selector);
    const keySplit: string[] = selector.split(":");
    let newstedAssignments: tpOptions = { ...props.stdAssigments };
    console.log(newstedAssignments);
    console.log(
      newstedAssignments[keySplit[0] as string].assignmentsIds[keySplit[1]]
    );
    return newstedAssignments[keySplit[0] as string].assignmentsIds[
      keySplit[1]
    ];
  };

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const elName = event.target.name || ":";
    const elValue = event.target.value;
    const keySplit: string[] = elName.split(":");
    let newstedAssignments: tpOptions = { ...props.stdAssigments };
    newstedAssignments[keySplit[0] as string].assignmentsIds[keySplit[1]] =
      parseInt(elValue as string);
    setstedAssignments(newstedAssignments);
    props.assigmentsChange(newstedAssignments);

    console.log(elName);
    console.log(elValue);
  };

  interface SelectorProps {
    label: string;
    id: string;
    options: any[];
    disabled: boolean | undefined;
    onChange?: (
      event: React.ChangeEvent<{ name?: string; value: unknown }>
    ) => void;
  }

  const AssignmentSelector = (props: SelectorProps) => {
    return (
      <FormControl className={classes.formControl} disabled={props.disabled}>
        <InputLabel htmlFor="assignment-native-simple">
          {props.label}
        </InputLabel>
        <Select
          native
          defaultValue={optionSelected(props.id)}
          onChange={props.onChange}
          label={props.label}
          inputProps={{
            name: props.id,
            id: props.id,
          }}
        >
          {props.options.map((option) => {
            console.log(option);
            return <option value={option.key}>{option.text}</option>;
          })}
        </Select>
      </FormControl>
    );
  };

  useEffect(() => {
    console.log("Gen Dates");
    // Update the document title using the browser API
    /* let newSelectedWeeks: WeeksList[] = [];
        if (props.timeOpts.month) {
            setOptSelected("month");
            newSelectedWeeks = getWeeksFromMonth(2021, props.stdMonths)
            setWeeksSelected(newSelectedWeeks);
        }
        if (props.timeOpts.week) {
            setOptSelected("week");
            newSelectedWeeks = props.fullWeeksList.filter((week, index) => {
                // if (props.stdWeeks.includes(index.toString())) {
                return props.stdWeeks.includes(index.toString())
                //}
            }).map(week => week)
            setWeeksSelected(newSelectedWeeks)
        }

        if (Object.keys(props.stdAssigments).length === 0) {
            let newSelectedAssignments = {};
            newSelectedWeeks.forEach((week: WeeksList) => {
                console.log("Creating Assi")
                newSelectedAssignments = { ...newSelectedAssignments, [week.start.toLocaleDateString()]: { assignmentsIds: [1, 2, 3, 4], dates: [], partners: [] } }
            })
            console.log(newSelectedAssignments);
            //props.assigmentsChange(newSelectedAssignments);
            setstedAssignments(newSelectedAssignments);
            //let assgList: any[] = []
        } else {
            setstedAssignments(props.stdAssigments);
        } */

    db.getAssignments().then((res: IAssignment[]) => {
      console.log(res);
      res.push({
        id: 0,
        name: "Video/Ninguna",
        participants: 0,
        type: "School",
      });
      setAssgList(
        res.map((assg) => {
          //console.log(assg)
          return { key: assg.id, text: assg.name };
        })
      );
    });
    //setAssgList(newassgList);
    //console.log(assgList);
  }, [props.fullWeeksList, db, setAssgList]);

  return (
    <div>
      <Grid container spacing={3}>
        {/* <div>{optSelected}</div> */}
        {/* {props.scheduleWeeks.map(week => { */}
        {Object.keys(props.stdAssigments).map((key) => {
          return (
            <Grid item xs>
              <div className={classNames.pane}>
                <Label
                  key={props.stdAssigments[
                    key
                  ].dates.start.toLocaleDateString()}
                >{`Semana del ${props.stdAssigments[
                  key
                ].dates.start.toLocaleDateString()} al ${props.stdAssigments[
                  key
                ].dates.end.toLocaleDateString()}`}</Label>
                <AssignmentSelector
                  label="Asignación 1"
                  id={`${props.stdAssigments[
                    key
                  ].dates.start.toLocaleDateString()}:0`}
                  options={assgList}
                  disabled={true}
                />
                <AssignmentSelector
                  label="Asignación 2"
                  id={`${props.stdAssigments[
                    key
                  ].dates.start.toLocaleDateString()}:1`}
                  options={assgList}
                  disabled={false}
                  onChange={handleChange}
                />
                <AssignmentSelector
                  label="Asignación 3"
                  id={`${props.stdAssigments[
                    key
                  ].dates.start.toLocaleDateString()}:2`}
                  options={assgList}
                  disabled={false}
                  onChange={handleChange}
                />
                <AssignmentSelector
                  label="Asignación 4"
                  id={`${props.stdAssigments[
                    key
                  ].dates.start.toLocaleDateString()}:3`}
                  options={assgList}
                  disabled={false}
                  onChange={handleChange}
                />

                {
                  //                               <Dropdown
                  //                                   key={`${props.stdAssigments[key].dates.start.toLocaleDateString()}:1`}
                  //                                   label="Asignación # 2"
                  //                                   defaultSelectedKey={optionSelected(`${props.stdAssigments[key].dates.start.toLocaleDateString()}:1`)}
                  //                                   options={assgList}
                  //                                   disabled={false}
                  //                                   styles={dropdownStyles}
                  //                                   id={`${props.stdAssigments[key].dates.start.toLocaleDateString()}:1`}
                  //                                   onChange={onChangeAssigment}
                  //                               />
                  //                               <Dropdown
                  //                                   key={`${props.stdAssigments[key].dates.start.toLocaleDateString()}:2`}
                  //                                   label="Asignación # 3"
                  //                                   defaultSelectedKey={3}
                  //                                   options={assgList}
                  //                                   disabled={false}
                  //                                   styles={dropdownStyles}
                  //                                   id={`${props.stdAssigments[key].dates.start.toLocaleDateString()}:2`}
                  //                                   onChange={onChangeAssigment}
                  //                               />
                  //                               <Dropdown
                  //                                   key={`${props.stdAssigments[key].dates.start.toLocaleDateString()}:3`}
                  //                                   label="Asignación # 4"
                  //                                   defaultSelectedKey={4}
                  //                                   options={assgList}
                  //                                   disabled={false}
                  //                                   styles={dropdownStyles}
                  //                                   id={`${props.stdAssigments[key].dates.start.toLocaleDateString()}:3`}
                  //                                   onChange={onChangeAssigment}
                  //                               />
                  //
                }
              </div>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default GeneratorAssigments;
