import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { TimeOpts, WeeksList } from '../../types/ministry.types';
import { Radio, RadioGroup } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            //display: 'flex',
        },
        formControl: {
            margin: theme.spacing(1),
        },
    }),
);

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
]



interface Props {
    monthsChange: any;
    weeksChange: any;
    timeChange: any;
    timeOpts: TimeOpts;
    stdMonths: string[];
    stdWeeks: string[];
    weeksListArray: WeeksList[]
}

export default function DatesGenerator(props: Props) {
    const classes = useStyles();


    //const weeksListArray: WeeksList[] = getWeeksFromMonth(2021, monthsRange);

    React.useEffect(() => {

    }, []);

    return (
        <div className={classes.root}>
            <FormControl component="fieldset">
                <FormLabel component="legend">Fechas</FormLabel>
              <RadioGroup aria-label="gender" name="gender1" value={props.timeOpts.month ? "month" : "week"} onChange={props.timeChange}>
                    <FormControlLabel value="week" control={<Radio />} label="Semanas" />
                    <FormControlLabel value="month" control={<Radio />} label="Meses" />
                </RadioGroup>
            </FormControl>
            <FormControl required component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Semanas</FormLabel>
                <FormGroup>
                    {props.weeksListArray.map((week, index) => {
                        return (
                            <FormControlLabel
                                control={<Checkbox disabled={!props.timeOpts.week} checked={props.stdWeeks.includes(index.toString())} onChange={props.weeksChange} name={index.toString()} />}
                                label={week.start.toDateString() + " al " + week.end.toDateString()}
                            />
                        );
                    })}
                </FormGroup>
            </FormControl>
            <FormControl required component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Meses</FormLabel>
                <FormGroup>
                    {months.map((month, index) => {
                        if (index >= toDay.getMonth()) {
                            return (
                                <FormControlLabel
                                    control={<Checkbox disabled={!props.timeOpts.month} checked={props.stdMonths.includes(index.toString())} onChange={props.monthsChange} name={index.toString()} key={index} />}
                                    label={month}
                                />
                            );
                        } else {
                            return (
                                <FormControlLabel
                                    control={<Checkbox disabled checked={props.stdMonths.includes(index.toString())} onChange={props.monthsChange} name={index.toString()} key={index} />}
                                    label={month}
                                />
                            );
                        }
                    })}
                </FormGroup>
            </FormControl>
        </div>
    );
}
