import { ActionButton, CommandBarButton, DefaultPalette, getTheme, IIconProps, IStackItemStyles, IStackStyles, IStackTokens, KTP_LAYER_ID, mergeStyleSets, PrimaryButton, Stack } from "@fluentui/react";
import React from "react";
import { ClassificationType } from "typescript";
import { LifeministryContext } from "../../App";
import { IDataBase, ISchedule } from "../../types/ministry.types";
import PartnersLayout from "./partnersLayout";

interface Props {
    stdAssigments: any;
}

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
    },
    saveBtn: {
        height: 44,
        float: "right",
        marginLeft: -90
    }
})

const addIcon: IIconProps = { iconName: 'Add' };

const GeneratorProgram: React.FunctionComponent<Props> = (props: Props) => {
    const db: IDataBase = React.useContext(LifeministryContext)
    const [allCouples, setAllCouples] = React.useState<tpOptions>({});
    const [rangeDate, setRangeDate] = React.useState<string>("");

    const getPartners = async (data: {}) => {
        //db.getPartner(`partners?num=5&gender=m`).then((result: any) => { console.log(result) });
        let allPartners: any[] = [];
        let allFullPartners: tpOptions = {};
        const startDate = new Date(Object.keys(data)[0]).toLocaleString().split(",")
        const endDate = new Date(Object.keys(data)[Object.keys(data).length - 1]).toLocaleString().split(",")
        setRangeDate(startDate[0] + "-" + endDate[0])
        for (const [key, value] of Object.entries(data)) {
            const newVal = value as any;
            console.log(`${key}: ${newVal.assignmentsIds}`);
            const valArray: [] = newVal.assignmentsIds as [];
            const date = new Date(key).toISOString();
            const partner = valArray.map(async assig => {
                //for (const assig of valArray) {
                console.log(assig);
                if (assig !== 0) {
                    let gender = "f";
                    if (assig === 1 || assig === 2) {
                        gender = "m";
                    }
                    const partnerURL = `partners?num=${assig}&gender=${gender}&date=${date}`
                    const partnerFound = db.getPartner(partnerURL);
                    return partnerFound;
                }
            });
            console.log(partner);
            const finalPartner = await Promise.all(partner);
            allPartners.push(...finalPartner)
        }
        //allFullPartners
        allPartners.forEach((partner) => {
            console.log(partner);
            if (allFullPartners[partner.date]) {
                allFullPartners[partner.date].push(partner)
            } else {
                allFullPartners[partner.date] = [partner]
            }
        })
        console.log(JSON.stringify(allFullPartners));
        setAllCouples(allFullPartners);
        //console.log(JSON.stringify(allPartners));
    }

    const saveShcedule = () => {
        const week: ISchedule = {
            id: 0,
            data: JSON.stringify(allCouples),
            range: rangeDate
        }

        db.addSchedule(week)

    }

    //getPartners(props.stdAssigments);
    return (
        <>
            <div><CommandBarButton iconProps={addIcon} text="Guardar" className={classNames.saveBtn} onClick={saveShcedule} /></div>
            <PrimaryButton text="Generar" allowDisabledFocus onClick={() => { getPartners(props.stdAssigments) }} />
            <div>
                {/* {getPartnersLayout(allCouples)} */}
                <PartnersLayout partners={allCouples} />
            </div>
        </>
    )
}

export default GeneratorProgram;