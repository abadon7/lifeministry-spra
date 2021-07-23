import React, { useEffect, useState } from 'react';
//import { LifeministryContext } from '../App';
//import { IAssignment, WeeksList } from '../types/ministry.types';
import {/*  DropdownMenuItemType, */ IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { /* Checkbox, ChoiceGroup, */ Dropdown, getTheme, IDropdownStyles, /* FontWeights, getTheme, */ /* IChoiceGroupOption, */ /* IStackTokens, */ Label,/* , mergeStyleSets *//* , Stack */
    mergeStyleSets
} from '@fluentui/react';
import { IAssignment, WeeksList } from '../../types/ministry.types';
import { getWeeksFromMonth } from '../../pages/generator';
import { LifeministryContext } from '../../App';

const theme = getTheme();
const classNames = mergeStyleSets({
    wrapper: {
        //height: '40vh',
        position: 'relative',
        maxHeight: 'inherit',
        //width: '45vh',
    },
    pane: {
        maxWidth: 400,
        border: '1px solid ' + theme.palette.neutralLight,
        margin: "10px auto",
        padding: 10
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
    dropdown: { width: 300, margin: "0 auto" },
};

type tpOptions = {
    [key: string]: any
}

interface TimeOpts extends tpOptions {
    week: boolean;
    month: boolean
}

interface AssignmentsSelected extends tpOptions {
    week: boolean;
}

interface Props {
    //monthsChange: any;
    //weeksChange: any;
    //timeChange: any;
    timeOpts: TimeOpts;
    stdMonths: string[];
    stdWeeks: string[];
    fullWeeksList: WeeksList[];
    stdAssigments: any;
    assigmentsChange: any;
}
//function GeneratorDates() {
const GeneratorAssigments: React.FunctionComponent<Props> = (props: Props) => {
    //const initialData: IAssignment[] = [{ "id": 0, "name": "Initial", "type": "school", "participants": 0 }];
    const [optSelected, setOptSelected] = useState<string>("");
    const [weeksSelected, setWeeksSelected] = useState<WeeksList[]>([]);
    const [assgList, setAssgList] = useState<IDropdownOption[]>([{ key: 'lectura', text: 'Lectura' }]);
    const db: any = React.useContext(LifeministryContext);
    const [stedAssignments, setstedAssignments] = React.useState({});

    const onChangeAssigment = (event: React.FormEvent<HTMLDivElement>, option?: IDropdownOption): void => {
        if (option) {
            console.log(option);
            const ev: HTMLButtonElement = event.target as HTMLButtonElement;
            const keySplit: string[] = ev.id.split(":");
            let newstedAssignments: tpOptions = { ...stedAssignments };
            newstedAssignments[keySplit[0] as string].assignmentsIds[keySplit[1]] = option.key;
            setstedAssignments(newstedAssignments);
            props.assigmentsChange(newstedAssignments);

            /* setSelectedKeys(
              item.selected ? [...selectedKeys, item.key as string] : selectedKeys.filter(key => key !== item.key),
            ); */
        }
    };

    useEffect(() => {
        console.log("Gen Dates");
        // Update the document title using the browser API
        let newSelectedWeeks: any[] = [];
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
        let newSelectedAssignments = {};
        newSelectedWeeks.forEach((week: any) => {
            console.log("Creating Assi")
            newSelectedAssignments = { ...newSelectedAssignments, [week.start.toLocaleDateString()]: { assignmentsIds: [1, 2, 3, 4], dates: [], partners: [] } }
        })
        console.log(newSelectedAssignments);
        //props.assigmentsChange(newSelectedAssignments);
        setstedAssignments(newSelectedAssignments);
        //let assgList: any[] = []

        db.getAssignments().then((res: IAssignment[]) => {
            console.log(res);
            res.push({ id: 0, name: "Video/Ninguna", participants: 0, type: "School" })
            setAssgList(res.map(assg => {
                //console.log(assg)
                return { key: assg.id, text: assg.name }
            }));
        });
        //setAssgList(newassgList);
        //console.log(assgList);
    }, [props.fullWeeksList, props.stdMonths, props.stdWeeks, props.timeOpts.month, props.timeOpts.week, db, setAssgList]);

    return (

        <div>
            {/* <div>{optSelected}</div> */}
            {weeksSelected.map(week => {
                return (
                    <div className={classNames.pane}>
                        <Label key={week.start.toLocaleDateString()}>{`Semana del ${week.start.toLocaleDateString()} al ${week.end.toLocaleDateString()}`}</Label>
                        <Dropdown
                            key={`${week.start.toLocaleDateString()}:0`}
                            label="Asignación # 1"
                            defaultSelectedKey="lectura"
                            options={[{ key: 'lectura', text: 'Lectura' }]}
                            disabled={true}
                            styles={dropdownStyles}
                        />
                        <Dropdown
                            key={`${week.start.toLocaleDateString()}:1`}
                            label="Asignación # 2"
                            defaultSelectedKey={2}
                            options={assgList}
                            disabled={false}
                            styles={dropdownStyles}
                            id={`${week.start.toLocaleDateString()}:1`}
                            onChange={onChangeAssigment}
                        />
                        <Dropdown
                            key={`${week.start.toLocaleDateString()}:2`}
                            label="Asignación # 3"
                            defaultSelectedKey={3}
                            options={assgList}
                            disabled={false}
                            styles={dropdownStyles}
                            id={`${week.start.toLocaleDateString()}:2`}
                            onChange={onChangeAssigment}
                        />
                        <Dropdown
                            key={`${week.start.toLocaleDateString()}:3`}
                            label="Asignación # 4"
                            defaultSelectedKey={4}
                            options={assgList}
                            disabled={false}
                            styles={dropdownStyles}
                            id={`${week.start.toLocaleDateString()}:3`}
                            onChange={onChangeAssigment}
                        />
                    </div>
                )
            })}
        </div>

    );
}

export default GeneratorAssigments; 
