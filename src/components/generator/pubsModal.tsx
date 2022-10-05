import * as React from 'react';
import { useId, useBoolean } from '@uifabric/react-hooks';
import {
    getTheme,
    mergeStyleSets,
    FontWeights,
    //ContextualMenu,
    //Toggle,
    DefaultButton,
    Modal,
    //IDragOptions,
    IconButton,
    IIconProps,
} from 'office-ui-fabric-react';
import { /* ChoiceGroup, */ /* IChoiceGroupOption, */ IScrollablePaneStyles, IStackStyles, /* Label, MaskedTextField, */ MessageBar, MessageBarType, PrimaryButton, ScrollablePane, Spinner, Stack, TextField/* , Toggle  */ } from '@fluentui/react';
//import { StudentsCalendar } from '../calendar/calendar';
import { useEffect, useState } from 'react';
import { IAssignment, IStudent } from '../../types/ministry.types';
import { LifeMinistryContext } from '../../App';
import SimpleStudentsTable from './simpleStdList';


const cancelIcon: IIconProps = { iconName: 'Cancel' };

interface Props {
    editStd: any;
    isOpen?: boolean;
    onClose: any;
    options: { gender: string, addr: string }
}

const SuccessMsg = () => (
    <MessageBar
        messageBarType={MessageBarType.success}
        isMultiline={false}
    >
        La información se ha guadado correctamente
    </MessageBar>
);

const theme = getTheme();
const contentStyles = mergeStyleSets({
    container: {
        display: 'flex',
        flexFlow: 'column nowrap',
        alignItems: 'stretch',
        height: 500

    },
    header: [
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
        //overflowY: 'hidden',
        selectors: {
            p: { margin: '14px 0' },
            'p:first-child': { marginTop: 0 },
            'p:last-child': { marginBottom: 0 },
        },
        overflow: 'auto',
        height: 350,
        width: 600

    },
    footer: [
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
    wrapper: {
        height: '80vh',
        position: 'relative',
        maxHeight: 'inherit',
    },
    pane: {
        maxWidth: 500,
        border: '1px solid ' + theme.palette.neutralLight,
    },
    textContent: {
        padding: '15px 10px',
    },
});
const scrollablePaneStyles: Partial<IScrollablePaneStyles> = { root: contentStyles.pane };
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

const footerStackStyles: Partial<IStackStyles> = { root: { width: "100%" } };

export const PubsModal: React.FunctionComponent<Props> = (props: Props) => {
    //const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
    //const [currentDate, setCurrentDate] = React.useState<Date>()
    const [isMsgShow, { setTrue: showMsg, setFalse: hideMsg }] = useBoolean(false);
    const [isLoadShow, { setTrue: showLoad, setFalse: hideLoad }] = useBoolean(false);
    const [stdData, setStdData] = useState<IStudent[]>([])
    const [participant, setParticipant] = useState<IStudent | undefined>()
    const db: any = React.useContext(LifeMinistryContext)

    const updateValues = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const ele = e.target as HTMLInputElement;
        console.log(ele.id);
        let value: string | number = ele.value;
        const keyName = ele.id;
        if (keyName === "participants") {
            value = parseInt(value);
        }
        /*  setStdData([{
             ...stdData[0],
             [keyName]: value
         }]) */
    }

    const titleId = useId('title');

    const sendStdData = (): void => {
        //showLoad();
        console.log(participant);
        props.editStd(participant, props.options.addr);
        //updateValues2("last", currentDate?.toISOString())
        /* const result = props.addStd(stdData);
        if (result) {
            hideLoad();
            showMsg();
            setTimeout(function () { hideMsg(); }, 3000);
        } */
    }

    useEffect(() => {
        console.log(props.options)
        console.log(db.getStudents(props.options.gender, "active").then((res: IStudent[]) => {
            console.log(res);
            setStdData(res)
        }));
    }, [db, props.options])

    return (
        <div>
            <Modal
                titleAriaId={titleId}
                isOpen={props.isOpen}
                onDismiss={props.onClose}
                isBlocking={false}
                containerClassName={contentStyles.container}
                dragOptions={undefined}
                allowTouchBodyScroll={true}
            >
                <div className={contentStyles.header}>
                    <span id={titleId}>Lista de publicadores</span>
                    <IconButton
                        styles={iconButtonStyles}
                        iconProps={cancelIcon}
                        ariaLabel="Close popup modal"
                        onClick={props.onClose}
                    />
                </div>
                <div className={contentStyles.body}>
                    {/* <ScrollablePane

                    >
                        
                    </ScrollablePane> */}
                    <SimpleStudentsTable data={stdData} cllBack={setParticipant} />

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
                        <DefaultButton text="Cancelar" onClick={props.onClose} />
                        <PrimaryButton text="Aceptar" onClick={() => { sendStdData() }} />
                    </Stack>
                </div>
            </Modal>
        </div>
    );
};


