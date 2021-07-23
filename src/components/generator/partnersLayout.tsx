import { ActionButton, CommandBarButton, DefaultPalette, getTheme, IIconProps, IStackItemStyles, IStackStyles, IStackTokens, KTP_LAYER_ID, mergeStyleSets, PrimaryButton, Stack } from "@fluentui/react";
import React, { useEffect } from "react";
import { useBoolean } from '@uifabric/react-hooks';
import { PubsModal } from "./pubsModal";
import { IStudent } from "../../types/ministry.types";

interface Props {
    partners: any;
}

const stackStyles: IStackStyles = {
    root: {
        //background: DefaultPalette.themeTertiary,
        textAlign: "left"
    },
};
const stackItemStyles: IStackItemStyles = {
    root: {
        //background: DefaultPalette.themePrimary,
        //color: DefaultPalette.white,
        padding: 5,
    },
};
const itemAlignmentsStackStyles: IStackStyles = {
    root: {
        background: DefaultPalette.themeTertiary,
        height: 100,
    },
};
const stackTokens: IStackTokens = {
    childrenGap: 5,
    padding: 10,
};

const containerStackTokens: IStackTokens = { childrenGap: 5 };

type tpOptions = {
    [key: string]: any
}
const theme = getTheme();
const classNames = mergeStyleSets({
    pane: {
        maxWidth: 500,
        border: '1px solid ' + theme.palette.neutralLight,
        margin: "10px auto",
        //padding: 10
    },
    stackAssName: {
        width: 200
    }
})

const addFriendIcon: IIconProps = { iconName: 'EditContact' };

const PartnersLayout: React.FunctionComponent<Props> = (props: Props) => {
    const [allPartners, setAllPartners] = React.useState<tpOptions>(props.partners);
    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
    const [modalData, setModalData] = React.useState<{ gender: string, addr: string }>({ gender: "m", addr: "" })

    const changeStd = (index: string, gender: string) => {
        console.log("Changing participants");
        console.log(`index:${index} - gender:${gender}`)
        setModalData({ gender: gender, addr: index });
        showModal()
    }

    const selectParticipant = (participant: IStudent, index: string) => {
        console.log(`new std ${participant} in index ${index}`)
        const splitIndex = index.split('/')
        let newStdData = { ...allPartners }
        console.log(splitIndex[1])
        console.log(newStdData[splitIndex[0]])
        newStdData[splitIndex[0]][splitIndex[1]][splitIndex[2]] = participant;
        hideModal()
        //setAllPartners(newStdData);
    }

    const getPartnersLayout = (data: tpOptions) => {
        let layout: any[] = [];
        const StartDate = new Date(Object.keys(data)[0]).toDateString()
        const EndDate = new Date(Object.keys(data)[Object.keys(data).length - 1]).toDateString()
        layout.push(<><p><strong>{`Pograma del ${StartDate} al ${EndDate}`}</strong></p></>)
        Object.entries(data).forEach((key) => {
            //<strong>{key[0]}</strong>
            const day: string = new Date(key[0]).toDateString()
            layout.push(<strong>{day}</strong>)
            key[1].forEach((couple: any, index: string) => {
                console.log(couple);
                layout.push(<div className={classNames.pane}>
                    <Stack horizontal styles={stackStyles} tokens={stackTokens}>
                        <Stack.Item grow={0} styles={stackItemStyles} className={classNames.stackAssName}>
                            <span>{couple.assigmenttype.name}</span>
                        </Stack.Item>
                        <Stack.Item grow={2} styles={stackItemStyles}>
                            {/* <ul>
                                <li>
                                    <ActionButton iconProps={addFriendIcon} allowDisabledFocus>
                                        {couple.incharge.name}
                                    </ActionButton></li>
                                <li><span>{couple.helper.name}</span></li>
                            </ul> */}
                            Publicador:
                            <ActionButton iconProps={addFriendIcon} allowDisabledFocus onClick={() => { changeStd(key[0] + "/" + index + "/incharge", couple.incharge.gender) }}>
                                {couple.incharge.name}
                            </ActionButton><br />
                            Ayudante:
                            <ActionButton iconProps={addFriendIcon} allowDisabledFocus onClick={() => { changeStd(key[0] + "/" + index + "/helper", couple.helper.gender) }}>
                                {couple.helper.name}
                            </ActionButton>
                        </Stack.Item>
                    </Stack>
                </div>
                )
            })
        })
        return layout
    }

    useEffect(() => {
        setAllPartners(props.partners);
    }, [props])

    return (
        <>
            <PubsModal editStd={selectParticipant} isOpen={isModalOpen} onClose={hideModal} options={modalData} />
            {getPartnersLayout(allPartners)}
        </>
    )
}

export default PartnersLayout;