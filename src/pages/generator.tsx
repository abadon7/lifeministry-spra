import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
//import StepLabel from '@material-ui/core/StepLabel';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { TimeOpts, WeeksList } from "../types/ministry.types";
//import GeneratorDates from '../components/generator/dates';
//import { IChoiceGroupOption } from '@fluentui/react';
import DatesGenerator from "../components/generator/datesGenerator";
import { /* Container */ Paper, StepButton } from "@material-ui/core";
import GeneratorAssigments from "../components/generator/assignment";
import GeneratorProgram from "../components/generator/generator";
import SchedulesList from "../components/generator/schedulesList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      //width: '100%',
      display: "flex",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginRight: theme.spacing(3),
      marginLeft: theme.spacing(3),
    },
  })
);

export const getWeeksFromMonth = (
  year: number,
  months: number[] | string[]
): WeeksList[] => {
  let weeks: WeeksList[] = [];
  //for (const mnth in months) {
  months.forEach((mnth: any) => {
    console.log("MONTH " + mnth);
    const month = parseInt(mnth);
    let fDay: Date = new Date(year, month, 1);
    let lDay: Date = new Date(year, month + 1, 0);
    if (fDay.getDay() !== 1) {
      console.log("This is not a monday");
      const fDateDay = fDay.getDay();
      if (fDateDay === 0) {
        fDay = new Date(year, month, fDay.getDate() + 1);
      }
      if (fDateDay > 1) {
        const diffDates = 8 - fDateDay;
        fDay = new Date(year, month, fDay.getDate() + diffDates);
      }
    }

    let nextMonth: number = month;
    let sDay: Date = new Date(year, month, fDay.getDate() + 6);
    //console.log(`Monday=${fDay} and Sunday =${sDay}`);
    weeks.push({ start: fDay, end: sDay });
    while (month === nextMonth && sDay.getDate() < lDay.getDate()) {
      fDay = new Date(year, month, fDay.getDate() + 7);
      sDay = new Date(year, month, fDay.getDate() + 6);
      nextMonth = sDay.getMonth();
      //console.log(`Monday=${fDay} and Sunday =${sDay}`);
      weeks.push({ start: fDay, end: sDay });
    }
    //console.log(weeks);
    //weeks.concat(newWeek);
  });
  console.log(weeks);
  return weeks;
};

const toDay: Date = new Date();

function rangeMonths(start: number, end: number) {
  return Array(end - start + 1)
    .fill(0)
    .map((_, idx) => start + idx);
}

const monthsRange = rangeMonths(toDay.getMonth(), 11);
console.log(monthsRange);

const weeksListArray: WeeksList[] = getWeeksFromMonth(
  toDay.getFullYear(),
  monthsRange
);

function getSteps() {
  return [
    "Escoge las semanas",
    "Organiza las asignaciones",
    "Genera el programa",
  ];
}

type assgOptions = {
  [key: string]: any;
};

const Generator = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const [selectedWeeks, setSelectedWeeks] = React.useState<string[]>([]);
  const [timeOption, setTimeOption] = React.useState<TimeOpts>({
    week: false,
    month: true,
  });
  const [selectedMonths, setSelectedMonths] = React.useState<string[]>([]);
  const [scheduleWeeks, setScheduleWeeks] = React.useState<WeeksList[]>([]);
  const [selectedAssigments, setSelectedAssigments] =
    React.useState<assgOptions>({});

  const _onChangeOptions = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const option = event.target.value;
    console.log(option);
    let newTimeoOpt = { ...timeOption };
    Object.keys(newTimeoOpt).forEach((v) => (newTimeoOpt[v] = false));
    setTimeOption({
      ...newTimeoOpt,
      [option as string]: true,
    });
    //updateValues2("gender", option?.key)
    let newSelectedWeeks: WeeksList[] = [];
    if (option === "month") {
      //setOptSelected("month");
      newSelectedWeeks = getWeeksFromMonth(2021, selectedMonths);
      //setScheduleWeeks(newSelectedWeeks);
    }
    if (option === "week") {
      //setOptSelected("week");
      newSelectedWeeks = weeksListArray
        .filter((week, index) => {
          // if (props.stdWeeks.includes(index.toString())) {
          return selectedWeeks.includes(index.toString());
          //}
        })
        .map((week) => week);
      //setScheduleWeeks(newSelectedWeeks)
    }

    let newSelectedAssignments = {};
    newSelectedWeeks.forEach((week: WeeksList) => {
      console.log("Creating Assi");
      newSelectedAssignments = {
        ...newSelectedAssignments,
        [week.start.toLocaleDateString()]: {
          assignmentsIds: [1, 2, 3, 4],
          dates: week,
          partners: [],
        },
      };
    });

    console.log(newSelectedAssignments);
    setSelectedAssigments(newSelectedAssignments);
    //props.assigmentsChange(newSelectedAssignments);
  };

  //const updateDatesSelected = () => {
  //    let newSelectedWeeks: WeeksList[] = [];
  //    if (timeOption.month) {
  //        //setOptSelected("month");
  //        newSelectedWeeks = getWeeksFromMonth(2021, selectedMonths)
  //        //setScheduleWeeks(newSelectedWeeks);
  //    }
  //    if (timeOption.week) {
  //        //setOptSelected("week");
  //        newSelectedWeeks = weeksListArray.filter((week, index) => {
  //            // if (props.stdWeeks.includes(index.toString())) {
  //            return selectedWeeks.includes(index.toString())
  //            //}
  //        }).map(week => week)
  //        //setScheduleWeeks(newSelectedWeeks)
  //    }

  //    let newSelectedAssignments = {};
  //    newSelectedWeeks.forEach((week: WeeksList) => {
  //        console.log("Creating Assi")
  //        //newSelectedAssignments = { ...newSelectedAssignments, [week.start.toLocaleDateString()]: { assignmentsIds: [1, 2, 3, 4], dates: [], partners: [] } }

  //        newSelectedAssignments = { ...newSelectedAssignments, [week.start.toLocaleDateString()]: { assignmentsIds: [1, 2, 3, 4], dates: week, partners: [] } }
  //    })

  //    console.log(newSelectedAssignments);
  //    //props.assigmentsChange(newSelectedAssignments);
  //    setSelectedAssigments(newSelectedAssignments);
  //    //return newSelectedAssignments
  //    //let assgList: any[] = []

  //}

  const _onChangeWeeks = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked: boolean = event.target.checked;
    console.log(`The option has been changed to ${isChecked}.`);
    const newSelectedWeeks = isChecked
      ? [...selectedWeeks, event.target.name]
      : selectedWeeks.filter((item) => item !== event.target.name);
    setSelectedWeeks(newSelectedWeeks);

    let newScheduleWeeks: WeeksList[] = [];
    newScheduleWeeks = weeksListArray
      .filter((week, index) => {
        // if (props.stdWeeks.includes(index.toString())) {
        return newSelectedWeeks.includes(index.toString());
        //}
      })
      .map((week) => week);

    let newSelectedAssignments = { ...selectedAssigments };
    if (isChecked) {
      newSelectedAssignments = {
        ...selectedAssigments,
        [weeksListArray[
          parseInt(event.target.name)
        ].start.toLocaleDateString()]: {
          assignmentsIds: [1, 2, 3, 4],
          dates: weeksListArray[parseInt(event.target.name)],
          partners: [],
        },
      };
    } else {
      delete newSelectedAssignments[
        weeksListArray[parseInt(event.target.name)].start.toLocaleDateString()
      ];
    }
    setScheduleWeeks(newScheduleWeeks);
    setSelectedAssigments(newSelectedAssignments);
  };

  // function _onChangeWeeks2(ev?: React.FormEvent<HTMLElement>, isChecked?: boolean) {
  //       console.log(`The option has been changed to ${isChecked}.`);
  //       const event = ev?.target as HTMLButtonElement;
  //       setSelectedWeeks(
  //           isChecked ? [...selectedWeeks, event.name as string] : selectedWeeks.filter(item => item !== event.name),
  //       );
  //   }

  const _onChangeMonths = (
    ev?: React.FormEvent<HTMLElement>,
    isChecked?: boolean
  ) => {
    console.log(`The option has been changed to ${isChecked}.`);
    const event = ev?.target as HTMLButtonElement;
    const newSelectedMonths = isChecked
      ? [...selectedMonths, event.name as string]
      : selectedMonths.filter((item) => item !== event.name);
    setSelectedMonths(newSelectedMonths);

    const newScheduleWeeks = [
      ...getWeeksFromMonth(toDay.getFullYear(), [event.name]),
    ];
    let newSelectedAssignments = { ...selectedAssigments };

    if (isChecked) {
      newScheduleWeeks.forEach((week: WeeksList) => {
        console.log("Creating Assi from month - Adding");
        newSelectedAssignments = {
          ...newSelectedAssignments,
          [week.start.toLocaleDateString()]: {
            assignmentsIds: [1, 2, 3, 4],
            dates: week,
            partners: [],
          },
        };
      });
    } else {
      newScheduleWeeks.forEach((week: WeeksList) => {
        console.log("Creating Assi from month - Deleting");
        delete newSelectedAssignments[week.start.toLocaleDateString()];
      });
    }
    //setScheduleWeeks([...scheduleWeeks, ...newScheduleWeeks])
    setScheduleWeeks(newScheduleWeeks);
    setSelectedAssigments(newSelectedAssignments);
  };

  const isStepCompleted = (step: number) => {
    switch (step) {
      case 0:
        return selectedWeeks.length > 0 || selectedMonths.length > 0;
      case 1:
        return true;
      default:
        return false;
    }
  };

  function getStepContent(stepIndex: number) {
    switch (stepIndex) {
      case 0:
        return (
          <DatesGenerator
            monthsChange={_onChangeMonths}
            weeksChange={_onChangeWeeks}
            timeChange={_onChangeOptions}
            timeOpts={timeOption}
            stdMonths={selectedMonths}
            stdWeeks={selectedWeeks}
            weeksListArray={weeksListArray}
          />
        );
      case 1:
        return (
          <GeneratorAssigments
            //timeOpts={timeOption}
            stdMonths={selectedMonths}
            //stdWeeks={selectedWeeks}
            fullWeeksList={weeksListArray}
            stdAssigments={selectedAssigments}
            //stdAssigments={() => {updateDatesSelected()}}
            assigmentsChange={setSelectedAssigments}
            //scheduleWeeks={scheduleWeeks}
          />
        );
      case 2:
        return <GeneratorProgram stdAssigments={selectedAssigments} />;
      default:
        return "Unknown stepIndex";
    }
  }
  const handleStep = (step: number) => () => {
    if (step > 0) {
      if (!isStepCompleted(step - 1)) {
        alert("Por completar paso " + step.toString());
        return;
      }
    }
    setActiveStep(step);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const loadSavedSchedule = () => {
    console.log("loading a Schedule");
  };

  React.useEffect(() => {
    //updateDatesSelected()
  }, []);

  return (
    <>
      <div className={classes.root}>
        <Paper className={classes.content}>
          <Stepper activeStep={activeStep} alternativeLabel nonLinear>
            {steps.map((label, index) => (
              <Step key={label}>
                {/* <StepLabel>{label}</StepLabel> */}
                <StepButton
                  onClick={handleStep(index)}
                  completed={isStepCompleted(index)}
                >
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  All steps completed
                </Typography>
                <Button onClick={handleReset}>Reset</Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Paper>
        <Paper className={classes.content}>
          <span>Programaciones</span>
          <SchedulesList loadSchedule={loadSavedSchedule} />
        </Paper>
      </div>
    </>
  );
};
export default Generator;
