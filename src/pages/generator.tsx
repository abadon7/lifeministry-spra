import React, { useEffect, useState } from 'react';
import { LifeministryContext } from '../App';
import { IAssignment, WeeksList } from '../types/ministry.types';
import { DropdownMenuItemType, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { Fabric, FontWeights, getTheme, IChoiceGroupOption, IStackStyles, IStackTokens, mergeStyleSets, Pivot, PivotItem, PivotLinkFormat, PrimaryButton, Stack } from '@fluentui/react';
import { Text } from '@fluentui/react';
import { Card } from '@uifabric/react-cards';
import GeneratorDates from '../components/generator/dates';
import GeneratorAssigments from '../components/generator/assignment';
import GeneratorProgram from '../components/generator/generator';
import SchedulesList from '../components/generator/schedulesList';

export const GeneratorContext: any = React.createContext("");

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
            //borderTop: '1px solid rgb(149 149 149)',
            //color: theme.palette.neutralPrimary,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            //width: "100%",
            padding: '12px 12px 14px 24px',
        },
    ],
});
const styles = {
    cardStyles: {
        root: {
            background: 'white',
            padding: 10,
            //borderTop: '5px solid #0078d4',
            width: '90%',
            maxWidth: '90%',
            margin: 'auto',
            //height: '55vh',
        }
    },
};

const fabricStyle: IStackStyles = {
    root: {
        width: "100%",
    },
};

//const scrollablePaneStyles: Partial<IScrollablePaneStyles> = { root: classNames.pane };
const sectionStackTokens: IStackTokens = { childrenGap: 30 };

export const getWeeksFromMonth = (year: number, months: number[] | string[]): WeeksList[] => {
    let weeks: WeeksList[] = [];
    //for (const mnth in months) {
    months.forEach((mnth: any) => {
        console.log("MONTH " + mnth);
        const month = parseInt(mnth)
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
    })
    console.log(weeks);
    return weeks;
};

const toDay: Date = new Date();

function rangeMonths(start: number, end: number) {
    return Array(end - start + 1).fill(0).map((_, idx) => start + idx)
}

const monthsRange = rangeMonths(toDay.getMonth(), 11);
console.log(monthsRange);

const weeksList: WeeksList[] = getWeeksFromMonth(2021, monthsRange);

/* const DropdownControlledMultiOptions: IDropdownOption[] = weeksList.map(ele => {
    let rObj = { key: 'weeksHeader', text: 'Semanas', itemType: DropdownMenuItemType.Header };
    rObj.key = ele.start.toLocaleDateString() + ele.end.toLocaleDateString();
    rObj.text = ele.start.toDateString() + " al " + ele.end.toDateString();
    rObj.itemType = 0;
    return rObj
});

console.log(DropdownControlledMultiOptions); */

type tpOptions = {
    [key: string]: boolean
}

interface TimeOpts extends tpOptions {
    week: boolean;
    month: boolean
}

function Generator() {
    const initialData: IAssignment[] = [{ "id": 0, "name": "Initial", "type": "school", "participants": 0 }];
    //const [, setStdData] = useState<IAssignment[]>(initialData);
    const [selectedWeeks, setSelectedWeeks] = React.useState<string[]>([]);
    const [selectedMonths, setSelectedMonths] = React.useState<string[]>([]);
    const [timeOption, setTimeOption] = React.useState<TimeOpts>({ week: false, month: false });
    const [selectedAssigments, setSelectedAssigments] = React.useState({});
    const [selectedKey, setSelectedKey] = React.useState<number>(0);

    const _onChangeOptions = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption): void => {
        console.log(option);
        let newTimeoOpt = { ...timeOption };
        Object.keys(newTimeoOpt).forEach(v => newTimeoOpt[v] = false);
        setTimeOption({
            ...newTimeoOpt,
            [option?.key as string]: true
        })
        //updateValues2("gender", option?.key)
    }
    function _onChangeWeeks(ev?: React.FormEvent<HTMLElement>, isChecked?: boolean) {
        console.log(`The option has been changed to ${isChecked}.`);
        const event = ev?.target as HTMLButtonElement;
        setSelectedWeeks(
            isChecked ? [...selectedWeeks, event.name as string] : selectedWeeks.filter(item => item !== event.name),
        );
    }
    const _onChangeMonths = (ev?: React.FormEvent<HTMLElement>, isChecked?: boolean) => {
        console.log(`The option has been changed to ${isChecked}.`);
        const event = ev?.target as HTMLButtonElement;
        setSelectedMonths(
            isChecked ? [...selectedMonths, event.name as string] : selectedMonths.filter(item => item !== event.name),
        );
    }

    const loadSavedSchedule = () => {
        console.log("loading a Schedule")
        setSelectedKey(2)
    }

    useEffect(() => {
        // Update the document title using the browser API

    }, [selectedKey]);

    return (
        <Fabric styles={fabricStyle}>
            <div className={classNames.flexDiv}>
                <div>
                    <Text variant={"xLarge"} block> Programador de Asignaciones </Text>
                </div>
            </div>
            <Stack horizontal tokens={sectionStackTokens}>
                <Stack.Item grow={4}>
                    <Card aria-label="Basic vertical card" styles={styles.cardStyles}>
                        <Card.Item>
                            <Pivot aria-label="Basic Pivot Example" selectedKey={String(selectedKey)} /* linkFormat={PivotLinkFormat.tabs} */>
                                <PivotItem
                                    headerText="Escoger fechas"
                                    itemKey="0"
                                    headerButtonProps={{
                                        'data-order': 1,
                                        'data-title': 'Semanas',
                                    }}
                                >
                                    <GeneratorDates
                                        monthsChange={_onChangeMonths}
                                        weeksChange={_onChangeWeeks}
                                        timeChange={_onChangeOptions}
                                        timeOpts={timeOption}
                                        stdMonths={selectedMonths}
                                        stdWeeks={selectedWeeks}
                                    />
                                </PivotItem>
                                <PivotItem
                                    headerText="Organizar Asignaciones"
                                    itemKey="1"
                                    headerButtonProps={{
                                        'data-order': 3,
                                        'data-title': 'Organizar',
                                    }}
                                >
                                    <GeneratorAssigments
                                        timeOpts={timeOption}
                                        stdMonths={selectedMonths}
                                        stdWeeks={selectedWeeks}
                                        fullWeeksList={weeksList}
                                        stdAssigments={selectedAssigments}
                                        assigmentsChange={setSelectedAssigments}
                                    />
                                </PivotItem>
                                <PivotItem
                                    headerText="Generar Programa"
                                    itemKey="2"
                                    headerButtonProps={{
                                        'data-order': 1,
                                        'data-title': 'Generar',
                                    }}
                                >
                                    <GeneratorProgram
                                        stdAssigments={selectedAssigments}
                                    />
                                </PivotItem>
                            </Pivot>
                        </Card.Item>
                    </Card>
                    {/* <Card styles={styles.cardStyles}>
                    <Card.Item>
                        <PrimaryButton text="Asignaciones" allowDisabledFocus />
                    </Card.Item>
                </Card>
                <Card styles={styles.cardStyles}>
                    <Card.Item>
                        <PrimaryButton text="Generar" allowDisabledFocus />
                    </Card.Item>
                </Card> */}
                </Stack.Item>
                <Stack.Item grow={1}>
                    <Card aria-label="Basic vertical card" styles={styles.cardStyles}>
                        <Card.Item>
                            <strong>Lista de programaciones</strong>
                            <SchedulesList loadSchedule={loadSavedSchedule} />
                        </Card.Item>
                    </Card>
                </Stack.Item>
            </Stack>
            {/* <Dropdown
                placeholder="Selecione las semanas"
                label="Semanas seleccionadas"
                selectedKeys={selectedKeys}
                // eslint-disable-next-line react/jsx-no-bind
                onChange={onChange}
                multiSelect
                options={DropdownControlledMultiOptions}
                styles={dropdownStyles}
            /> */}
        </Fabric>
    );
}

export default Generator; 
