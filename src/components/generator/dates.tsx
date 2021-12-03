import React, { useEffect, useState } from 'react';
//import { LifeministryContext } from '../App';
//import { IAssignment, WeeksList } from '../types/ministry.types';
import { DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Checkbox, ChoiceGroup, FontWeights, getTheme, IChoiceGroupOption, IStackTokens, Label, mergeStyleSets, Stack } from '@fluentui/react';
import { WeeksList } from '../../types/ministry.types';
import { getWeeksFromMonth } from '../../pages/generator';
import { createStyles, FormControl, FormControlLabel, FormGroup, FormLabel, makeStyles, Theme } from '@material-ui/core';

//const theme = getTheme();
const classNames = mergeStyleSets({
    wrapper: {
        //height: '40vh',
        position: 'relative',
        maxHeight: 'inherit',
        //width: '45vh',
    },
    pane: {
        maxWidth: 400,
        //border: '1px solid ' + theme.palette.neutralLight,
    },
    sticky: {
        //color: theme.palette.neutralDark,
        padding: '5px 20px 5px 10px',
        fontSize: '13px',
        //borderTop: '1px solid ' + theme.palette.black,
        //borderBottom: '1px solid ' + theme.palette.black,
    },
    textContent: {
        padding: '15px 10px',
    },
    checkbox: {
        padding: '5px'
    },
    flexDiv: [
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
    ],
});

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        formControl: {
            margin: theme.spacing(3),
        },
    }),
);

const sectionStackTokens: IStackTokens = { childrenGap: 30 };



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

function rangeMonths(start: number, end: number) {
    return Array(end - start + 1).fill(0).map((_, idx) => start + idx)
}

const monthsRange = rangeMonths(toDay.getMonth(), 11);


const options: IChoiceGroupOption[] = [
    { key: 'week', text: 'Semana', iconProps: { iconName: 'CalendarWeek' } },
    { key: 'month', text: 'Mes', iconProps: { iconName: 'Calendar' } },
    //{ key: 'month', text: 'Month', iconProps: { iconName: 'Calendar' }, disabled: true },
];


type tpOptions = {
    [key: string]: boolean
}

interface TimeOpts extends tpOptions {
    week: boolean;
    month: boolean
}

interface Props {
    monthsChange: any;
    weeksChange: any;
    timeChange: any;
    timeOpts: TimeOpts;
    stdMonths: string[];
    stdWeeks: string[];
}
//function GeneratorDates() {
const GeneratorDates: React.FunctionComponent<Props> = (props: Props) => {
    //const initialData: IAssignment[] = [{ "id": 0, "name": "Initial", "type": "school", "participants": 0 }];
    const [optSelected, setOptSelected] = useState<string>("");
    //const db: any = React.useContext(LifeministryContext)
    const classes = useStyles();

    const weeksListArray: WeeksList[] = getWeeksFromMonth(2021, monthsRange);

    const DropdownControlledMultiOptions: IDropdownOption[] = weeksListArray.map(ele => {
        let rObj = { key: 'weeksHeader', text: 'Semanas', itemType: DropdownMenuItemType.Header };
        rObj.key = ele.start.toLocaleDateString() + ele.end.toLocaleDateString();
        rObj.text = ele.start.toDateString() + " al " + ele.end.toDateString();
        rObj.itemType = 0;
        return rObj
    });
    console.log(DropdownControlledMultiOptions);

    useEffect(() => {
        console.log("Gen Dates");
        // Update the document title using the browser API
        if (props.timeOpts.month) {
            setOptSelected("month");
        }
        if (props.timeOpts.week) {
            setOptSelected("week");
        }
    }, [props]);

    return (
        <>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Semanas</FormLabel>
                <FormGroup>

                    {weeksListArray.map((week, index) => {
                        return (
                            <FormControlLabel
                                control={<Checkbox checked={props.stdWeeks.includes(index.toString())} onChange={props.weeksChange} name={index.toString()} />}
                                label={week.start.toDateString() + " al " + week.end.toDateString()}
                            />
                        );
                    })}
                </FormGroup>
            </FormControl>

            {/* <Stack horizontal tokens={sectionStackTokens}>
                <ChoiceGroup label="Tipo de fecha" defaultSelectedKey={optSelected} options={options} onChange={props.timeChange} />
                <div className={classNames.wrapper}>
                    <Label>Semanas</Label>
                 
                    {DropdownControlledMultiOptions.map((week, index) => {
                        return (
                            <Checkbox disabled={!props.timeOpts.week} className={classNames.checkbox} name={index.toString()} key={week.key} label={week.text} onChange={props.weeksChange} checked={props.stdWeeks.includes(index.toString())} />
                        );
                    })}
                    
                </div>
           
                <div className={classNames.wrapper}>
                    <Label>Meses</Label>
                    
                    {months.map((month, index) => {
                        if (index >= toDay.getMonth()) {
                            return (
                                <Checkbox disabled={!props.timeOpts.month} className={classNames.checkbox} name={index.toString()} checked={props.stdMonths.includes(index.toString())} key={index} label={month} onChange={props.monthsChange} />
                            );
                        } else {
                            return (
                                <Checkbox disabled className={classNames.checkbox} name={index.toString()} key={index} label={month} onChange={props.monthsChange} />
                            );
                        }
                    })}
                </div>
            </Stack> */}
        </>
    );
}

export default GeneratorDates; 
