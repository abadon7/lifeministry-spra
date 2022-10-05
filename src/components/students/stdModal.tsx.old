import * as React from 'react';
import { useId, useBoolean } from '@uifabric/react-hooks';
import {
    getTheme,
    mergeStyleSets,
    FontWeights,
    ContextualMenu,
    //Toggle,
    DefaultButton,
    Modal,
    //IDragOptions,
    IconButton,
    IIconProps,
} from 'office-ui-fabric-react';
import { ChoiceGroup, IChoiceGroupOption, IStackStyles, Label, /* MaskedTextField, */ MessageBar, MessageBarType, PrimaryButton, Spinner, Stack, TextField, Toggle } from '@fluentui/react';
import { StudentsCalendar } from '../calendar/calendar';
import { useEffect } from 'react';
import { IStudent } from '../../types/ministry.types';


const cancelIcon: IIconProps = { iconName: 'Cancel' };

const options: IChoiceGroupOption[] = [
    { key: 'f', text: 'Hermana', iconProps: { iconName: 'Contact' } },
    { key: 'm', text: 'Hermano', iconProps: { iconName: 'Contact' } },
];


/* const initialData: IStudent[] = [{
    "id": 0,
    "name": "",
    "gender": "f",
    "cel": 0,
    "active": true,
    "notes": "",
    "last": "",
    "lastpartner": 0
}]
 */
interface Props {
    addStd: any;
    isOpen?: boolean;
    onClose: any;
    mode: string;
    data: IStudent[];
}

const SuccessMsg = () => (
    <MessageBar
        messageBarType={MessageBarType.success}
        isMultiline={false}
    >
        La información se ha guadado correctamente
    </MessageBar>
);

const footerStackStyles: Partial<IStackStyles> = { root: { width: "100%" } };

export const StudentsModal: React.FunctionComponent<Props> = (props: Props) => {
    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
    const [stdData, setStdData] = React.useState<IStudent[]>(props.data)
    const [currentDate, setCurrentDate] = React.useState<Date>()
    const [isMsgShow, { setTrue: showMsg, setFalse: hideMsg }] = useBoolean(false);
    const [isLoadShow, { setTrue: showLoad, setFalse: hideLoad }] = useBoolean(false);

    const updateValues = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const ele = e.target as HTMLInputElement;
        console.log(ele.id);
        let value: string | number = ele.value;
        const keyName = ele.id;
        if (keyName === "cel") {
            value = parseInt(value);
        }
        setStdData([{
            ...stdData[0],
            [keyName]: value
        }])
    }

    const updateValues2 = (key?: string, value?: string | boolean | number | Date): void => {
        console.log(`${key} = ${value}`);
        setStdData([{
            ...stdData[0],
            [key as string]: value
        }])
    }

    function _onChangeOptions(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption): void {
        console.dir(option);
        updateValues2("gender", option?.key)
    }
    function _onChangeToggle(ev?: React.MouseEvent<HTMLElement>, checked?: boolean) {
        console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
        updateValues2("active", checked)
    }

    const onChangeDate = (date: Date) => {
        console.log(date);
        setCurrentDate(date);
        updateValues2("last", date.toISOString())
    }
    // Use useId() to ensure that the IDs are unique on the page.
    // (It's also okay to use plain strings and manually ensure uniqueness.)
    const titleId = useId('title');

    const sendStdData = (): void => {
        showLoad();
        //updateValues2("last", currentDate?.toISOString())
        const result = props.addStd(stdData);
        if (result) {
            hideLoad();
            showMsg();
            setTimeout(function () { hideMsg(); }, 3000);
        }
    }

    useEffect(() => {
        setStdData(props.data);
        console.log(props.data);
        let formatedDate: string = "01/01/21";
        const currentDate = props.data[0].last;
        if (currentDate) {
            formatedDate = currentDate.split("T")[0].replace(/-/g, "/");
        }
        const newFormatedDate = new Date(formatedDate);
        setCurrentDate(newFormatedDate);
        //updateValues2("last", newFormatedDate.toISOString());
        if (props.mode === "edit") {
            console.log("This is a edit mode modal");
            //setStdData(props.data);
        } else {
            console.log("This is a new modal");
            //updateValues2("last", newFormatedDate.toISOString());
        }
    }, [props.data, props.mode])

    return (
        <div>
            <Modal
                titleAriaId={titleId}
                isOpen={props.isOpen}
                onDismiss={props.onClose}
                isBlocking={false}
                containerClassName={contentStyles.container}
                dragOptions={undefined}
            >
                <div className={contentStyles.header}>
                    <span id={titleId}>Datos del Estudiante</span>
                    <IconButton
                        styles={iconButtonStyles}
                        iconProps={cancelIcon}
                        ariaLabel="Close popup modal"
                        onClick={props.onClose}
                    />
                </div>
                <div className={contentStyles.body}>
                    <TextField label="Nombre" id="name" required defaultValue={stdData[0].name} onChange={(event) => { updateValues(event) }} />
                    <ChoiceGroup label="Escoja uno" id="gender" required defaultSelectedKey={stdData[0].gender} options={options} onChange={_onChangeOptions} />
                    <Toggle label="Activo" id="active" inlineLabel onText="Si" offText="No" defaultChecked={stdData[0].active} onChange={_onChangeToggle} />
                    <TextField id="notes" label="Nota" onChange={(event) => { updateValues(event) }} />
                    <TextField label="Celular" required id="cel" type="number" defaultValue={stdData[0].cel.toString()} onChange={(event) => { updateValues(event) }} />
                    {/* <MaskedTextField label="With input mask" mask="(999) 999 - 9999" /> */}
                    <Label>Última asignación</Label>
                    <StudentsCalendar onChangeDate={onChangeDate} currentDate={currentDate} />
                </div>
                <div>
                    {isLoadShow &&
                        <Spinner label="Guardando..." ariaLive="assertive" labelPosition="right" />
                    }
                    {isMsgShow &&
                        <SuccessMsg />
                    }
                </div>
                <div className={contentStyles.footer}>
                    <Stack horizontal horizontalAlign="end" styles={footerStackStyles}>
                        <DefaultButton text="Borrar" onClick={showModal} />
                        <PrimaryButton text="Guardar" onClick={() => { sendStdData() }} />
                    </Stack>
                </div>
            </Modal>
        </div>
    );
};

const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
    },
    header: [

        //theme.fonts.xLargePlus,
        {
            flex: '1 1 auto',
            borderTop: `4px solid ${theme.palette.themePrimary}`,
            color: theme.palette.neutralPrimary,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '12px 12px 14px 24px',
        },
    ],
    body: {
        flex: '4 4 auto',
        padding: '0 24px 24px 24px',
        overflowY: 'hidden',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
    },
    footer: [

        //theme.fonts.xLargePlus,
        {
            flex: '1 1 auto',
            borderTop: '1px solid rgb(149 149 149)',
            color: theme.palette.neutralPrimary,
            display: 'flex',
            alignItems: 'center',
            fontWeight: FontWeights.semibold,
            padding: '12px 12px 14px 24px',
        },
    ],
});

const iconButtonStyles = {
    root: {
        color: theme.palette.neutralPrimary,
        marginLeft: 'auto',
        marginTop: '4px',
        marginRight: '2px',
    },
    rootHovered: {
        color: theme.palette.neutralDark,
    },
};
