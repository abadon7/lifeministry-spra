import * as React from 'react';
//import { TextField } from 'office-ui-fabric-react/lib/TextField';
//import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Fabric } from 'office-ui-fabric-react/lib/Fabric';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import {
    DetailsList,
    DetailsListLayoutMode,
    Selection,
    SelectionMode,
    IColumn,
    CheckboxVisibility,
} from 'office-ui-fabric-react/lib/DetailsList';
import { MarqueeSelection } from 'office-ui-fabric-react/lib/MarqueeSelection';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { AssigmentsModal } from './assgModal';
import { useBoolean } from '@uifabric/react-hooks';
import { CommandBarButton, /* DefaultButton, */ /* DefaultPalette, */ FontWeights, IIconProps, ISearchBoxStyles, /* IStackItemStyles, */ IStackStyles, /* IStackTokens, Label, */ SearchBox, Stack, Text } from '@fluentui/react';
import { IAssignment, IDataBase } from '../../types/ministry.types';
import { LifeMinistryContext } from '../../App';

const classNames = mergeStyleSets({
    fileIconHeaderIcon: {
        padding: 0,
        fontSize: '16px',
    },
    fileIconCell: {
        textAlign: 'center',
        selectors: {
            '&:before': {
                content: '.',
                display: 'inline-block',
                verticalAlign: 'middle',
                height: '100%',
                width: '0px',
                visibility: 'hidden',
            },
        },
    },
    fileIconImg: {
        verticalAlign: 'middle',
        maxHeight: '16px',
        maxWidth: '16px',
    },
    controlWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    exampleToggle: {
        display: 'inline-block',
        marginBottom: '10px',
        marginRight: '30px',
    },
    selectionDetails: {
        marginBottom: '20px',
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
            //width: "100%"
            padding: '12px 12px 14px 24px',
        },
    ],
});
/* const controlStyles = {
    root: {
        margin: '0 30px 20px 0',
        maxWidth: '300px',
    },
}; */

export interface IDetailsListDocumentsExampleState {
    columns: IColumn[];
    items: IAssignment[];
    selectionDetails: string;
    isModalSelection: boolean;
    isCompactMode: boolean;
    announcedMessage?: string;
}

export interface IDocument {
    key: string;
    name: string;
    value: string;
    iconName: string;
    fileType: string;
    modifiedBy: string;
    dateModified: string;
    dateModifiedValue: number;
    fileSize: string;
    fileSizeRaw: number;
}


interface Props {
    data: IAssignment[];
}


const initialData: IAssignment[] = [{ "id": 0, "name": "Initial", "type": "school", "participants": 0 }];


const searchBoxStyles: Partial<ISearchBoxStyles> = { root: { width: 200, height: 44 } };

const addIcon: IIconProps = { iconName: 'Add' };
const mailIcon: IIconProps = { iconName: 'Mail' };
const stackStyles: Partial<IStackStyles> = { root: { width: "100%", height: 44 } };

/* const stackItemStyles: IStackItemStyles = {
    root: {
        background: DefaultPalette.themePrimary,
        color: DefaultPalette.white,
        padding: 5,
    },
}; */
const fabricStyle: IStackStyles = {
    root: {
        width: "100%",
    },
};

/* const itemAlignmentsStackTokens: IStackTokens = {
    childrenGap: 5,
    padding: 10,
};

const fabricStyle2: React.CSSProperties = {
    width: "100%",
}; */

const AssigmentsTable = (props: Props) => {
    //export class StudentsTable extends React.Component<{}, IDetailsListDocumentsExampleState> {
    let _selection: Selection;
    //let _selection2: Selection;
    let _allItems: IAssignment[];
    _allItems = props.data;
    //console.log(_allItems[0]);
    const isModalSelection = true;
    const isCompactMode = false;

    const [items, setItems] = React.useState(_allItems);
    const [announcedMessage, setAnnouncedMessage] = React.useState();
    const [isModalOpen, { setTrue: showModal, setFalse: hideModal }] = useBoolean(false);
    const [modalData, setModalData] = React.useState({ mode: "new", data: initialData })
    const db: IDataBase = React.useContext(LifeMinistryContext)

    React.useEffect(() => {
        console.log("component updated");
        setItems(props.data);
        //_allItems = props.data;
        //console.log(_allItems[0]);
    }, [props, isModalOpen]);

    const _onColumnClick2 = (): void => {
        console.log("Call from 2 function");
        console.log(items[0]);
    }

    const _onColumnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
        //const { columns, items } = state;
        _onColumnClick2();
        console.log(items[0]);
        const newColumns: IColumn[] = tableColumns.slice();
        const currColumn: IColumn = newColumns.filter(currCol => column.key === currCol.key)[0];
        newColumns.forEach((newCol: IColumn) => {
            if (newCol === currColumn) {
                currColumn.isSortedDescending = !currColumn.isSortedDescending;
                currColumn.isSorted = true;
                //setAnnouncedMessage(`${currColumn.name} is sorted ${currColumn.isSortedDescending ? 'descending' : 'ascending'}`)
            } else {
                newCol.isSorted = false;
                newCol.isSortedDescending = true;
            }
        });
        console.log(props.data[0])
        const newItems = _copyAndSort(props.data, currColumn.fieldName!, currColumn.isSortedDescending);
        setColumns(newColumns);
        setItems(newItems);
    };

    _selection = new Selection({
        onSelectionChanged: () => {
            console.log(items[0]);
            console.log("Row selected");
            //setSelectionDetails(_getSelectionDetails());
            const crrStudentData: string | IAssignment[] = _getSelectionDetails();
            console.log(crrStudentData[0])
            setModalData({
                mode: "edit",
                data: crrStudentData as IAssignment[]
            })
            showModal();
        },
    });

    /* _selection2 = new Selection({
        onSelectionChanged: () => {
            console.log("Row selected from _selection2");
            const crrStudentData: string | IAssignment[] = _getSelectionDetails();
            console.log(crrStudentData[0]);
            setModalData({
                mode: "edit",
                data: crrStudentData as IAssignment[]
            })
            //setSelectionDetails(_getSelectionDetails());
        },
    }); */

    const _getSelectionDetails = (): string | IAssignment[] => {
        const selectionCount = _selection.getSelectedCount();

        switch (selectionCount) {
            case 0:
                return initialData;
            case 1:
                //return '1 item selected: ' + (_selection.getSelection()[0] as IAssignment).name;
                return _selection.getSelection() as IAssignment[];
            default:
                return `${selectionCount} items selected`;
        }
    }

    const columns: IColumn[] = [
        {
            key: 'column1',
            name: 'Icon',
            className: classNames.fileIconCell,
            iconClassName: classNames.fileIconHeaderIcon,
            ariaLabel: 'Column operations for File type, Press to sort on File type',
            iconName: 'Page',
            isIconOnly: true,
            fieldName: 'name',
            minWidth: 16,
            maxWidth: 16,
            onColumnClick: _onColumnClick,
            /* onRender: (item: IAssignment) => {
                return <img src={item.iconName} className={classNames.fileIconImg} alt={item.fileType + ' file icon'} />;
            }, */
        },
        {
            key: 'column2',
            name: 'Nombre',
            fieldName: 'name',
            minWidth: 100,
            maxWidth: 250,
            isRowHeader: true,
            isResizable: true,
            isSorted: true,
            isSortedDescending: false,
            sortAscendingAriaLabel: 'Sorted A to Z',
            sortDescendingAriaLabel: 'Sorted Z to A',
            onColumnClick: _onColumnClick,
            data: 'string',
            isPadded: true,
        },
        {
            key: 'column3',
            name: 'Tipo',
            fieldName: 'Type',
            minWidth: 30,
            maxWidth: 50,
            isResizable: true,
            onColumnClick: _onColumnClick,
            data: 'string',
            onRender: (item: IAssignment) => {
                return <span>{item.type}</span>;
            },
            isPadded: true,
        },
        {
            key: 'column4',
            name: 'Participantes',
            fieldName: 'participants',
            minWidth: 50,
            maxWidth: 50,
            isResizable: true,
            isCollapsible: true,
            data: 'number',
            onColumnClick: _onColumnClick,
            onRender: (item: IAssignment) => {
                return <span>{item.participants}</span>;
            },
            isPadded: true,
        },

    ];
    //_allItems = [{ "id": 1, "name": "Ana Iris Arrieta ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:00Z", "lastpartner": 0 }, { "id": 2, "name": "Kelly Arrieta ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:01Z", "lastpartner": 0 }, { "id": 3, "name": "Wilson Arrieta ", "gender": "m", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:02Z", "lastpartner": 0 }, { "id": 4, "name": "Wilson hijo Arrieta ", "gender": "m", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:03Z", "lastpartner": 0 }, { "id": 5, "name": "Claribel Cárdenas ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:04Z", "lastpartner": 0 }, { "id": 6, "name": "Samuel Cárdenas ", "gender": "m", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:05Z", "lastpartner": 0 }, { "id": 7, "name": "Yesenia Cárdenas", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:06Z", "lastpartner": 0 }, { "id": 8, "name": "Vélez Carolina ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:07Z", "lastpartner": 0 }, { "id": 9, "name": "Dairo C Chávez ", "gender": "m", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:08Z", "lastpartner": 0 }, { "id": 10, "name": "Mary Cielo Corpus ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:09Z", "lastpartner": 0 }, { "id": 11, "name": "Pablo Corpus ", "gender": "m", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:10Z", "lastpartner": 0 }, { "id": 12, "name": "Paulina Corpus ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:11Z", "lastpartner": 0 }, { "id": 13, "name": "Aldair Galván ", "gender": "m", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:12Z", "lastpartner": 0 }, { "id": 14, "name": "Iván Galván ", "gender": "m", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:13Z", "lastpartner": 0 }, { "id": 15, "name": "Jael Galván ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:14Z", "lastpartner": 0 }, { "id": 16, "name": "Nelson Galvis Galván ", "gender": "m", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:15Z", "lastpartner": 0 }, { "id": 17, "name": "Abad García ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:16Z", "lastpartner": 0 }, { "id": 18, "name": "Doris González ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:17Z", "lastpartner": 0 }, { "id": 19, "name": "Brenda Guardo ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:18Z", "lastpartner": 0 }, { "id": 20, "name": "Celia Guardo ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-26T11:58:04.3956794-05:00", "lastpartner": 38 }, { "id": 21, "name": "Oleida Guzmán ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:20Z", "lastpartner": 0 }, { "id": 22, "name": "Eneida Hoyos ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:21Z", "lastpartner": 0 }, { "id": 23, "name": "Marley Jaller ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:22Z", "lastpartner": 0 }, { "id": 24, "name": "Eduardo Jaller ", "gender": "m", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:23Z", "lastpartner": 0 }, { "id": 25, "name": "Salma Jaller ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:24Z", "lastpartner": 0 }, { "id": 26, "name": "Isabella Jiménez ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:25Z", "lastpartner": 0 }, { "id": 27, "name": "Lilián Manchego ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:26Z", "lastpartner": 0 }, { "id": 28, "name": "Isabel Manjarrés", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:27Z", "lastpartner": 0 }, { "id": 29, "name": "Angélica Montesinos", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:28Z", "lastpartner": 0 }, { "id": 30, "name": "Pio Pacheco", "gender": "m", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:29Z", "lastpartner": 0 }, { "id": 31, "name": "Maryonis Pacheco", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:30Z", "lastpartner": 0 }, { "id": 32, "name": "Rita Rico ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:31Z", "lastpartner": 0 }, { "id": 33, "name": "Karol Rincón ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:32Z", "lastpartner": 0 }, { "id": 34, "name": "Katerin Rincón", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:33Z", "lastpartner": 0 }, { "id": 35, "name": "Rosmira Rodríguez", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:34Z", "lastpartner": 0 }, { "id": 36, "name": "Sixta Rodríguez ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:35Z", "lastpartner": 0 }, { "id": 37, "name": "Erika Silgado", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:36Z", "lastpartner": 0 }, { "id": 38, "name": "Lorena Silgado", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-26T11:58:04.3956794-05:00", "lastpartner": 20 }, { "id": 39, "name": "Ana Turizo", "gender": "f", "cel": 0, "active": false, "notes": "", "last": "2020-11-01T00:00:38Z", "lastpartner": 0 }, { "id": 40, "name": "Calixto Turizo", "gender": "m", "cel": 0, "active": false, "notes": "", "last": "2020-11-01T00:00:39Z", "lastpartner": 0 }, { "id": 41, "name": "Máximo Villalobos", "gender": "m", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:40Z", "lastpartner": 0 }, { "id": 42, "name": "Sara Villalobos", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:41Z", "lastpartner": 0 }, { "id": 43, "name": "Yadith Villalobos ", "gender": "f", "cel": 0, "active": true, "notes": "", "last": "2020-11-01T00:00:42Z", "lastpartner": 0 }]
    const [tableColumns, setColumns] = React.useState(columns);
    /* const [selectionDetails, setSelectionDetails] = React.useState(_getSelectionDetails); */
    //constructor(props: {}) {
    //super(props);

    //_allItems = _generateDocuments();

    const _getKey = (item: any, index?: number): string => {
        return item.key;
    }

    const _onChangeText = (ev?: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        const text2 = ev?.target as HTMLButtonElement;
        console.log(text2.value);
        const text = text2.value;
        setItems(text ? _allItems.filter(i => i.name.toLowerCase().indexOf(text) > -1) : _allItems)
        console.log(items);
    };

    const _onItemInvoked = (item: any): void => {
        alert(`Item invoked: ${item.name}`);
    }

    const _addStd = (data: IAssignment[]): boolean => {
        console.log(data);
        //let method: string = "POST"
        //let finalData: IStudent[] | IStudent = data;
        if (modalData.mode === "edit") {
            //method = "PUT"
            //finalData = data[0];
            return db.updateAssignment(data[0]);
        } else {
            return db.addAssignments(data);
        }

        /* console.log(data);
        let method: string = "POST"
        let finalData: IAssignment[] | IAssignment = data;
        if (modalData.mode === "edit") {
            method = "PUT"
            finalData = data[0];
        }
        const dataUrl = "http://localhost:8000/students";
        const result = fetchData(dataUrl, finalData, method);
        if (result) {
            return true
        }
        return false */
    }

    /* const fetchData = async (url: string = '', data: IAssignment[] | IAssignment = [], method: string = 'POST') => {
        // Default options are marked with *
        const response = await fetch(url, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            //mode: 'cors', // no-cors, *cors, same-origin
            //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin', // include, *same-origin, omit
            //headers: {
            //   'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
            //},
            //redirect: 'follow', // manual, *follow, error
            //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data) // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    } */

    /* const closeModal = () => {
        console.log("Closing");
        hideModal();
    } */

    const openModal = () => {
        console.log("Opening");
        setModalData({
            mode: "new",
            data: initialData
        })
        showModal();
    }

    /* const onClickTest = () => {
        console.log("Good Click")
    } */


    /*  useEffect(() => {
 
     }); */
    //const { isCompactMode, items, selectionDetails, isModalSelection, announcedMessage } = state;

    return (
        <Fabric styles={fabricStyle}>
            {/* <div className={classNames.selectionDetails}>{selectionDetails}</div> */}

            {/* <DefaultButton onClick={openModal} text="Open Modal" /> */}
            {/* <DefaultButton onClick={_onColumnClick2} text="Test" /> */}
            {/* <div className={classNames.controlWrapper}>
                <TextField label="Filter by name:" onChange={(event) => { _onChangeText(event) }} styles={controlStyles} />
                <Announced message={`Number of items after filter applied: ${items.length}.`} />
            </div> */}
            <div className={classNames.flexDiv}>
                <div>
                    <Text variant={"xLarge"} block> Asignaciones </Text>
                </div>
                <Stack horizontal horizontalAlign="end" styles={stackStyles}>
                    <CommandBarButton iconProps={mailIcon} text="Borrar" disabled={true} checked={false} />
                    <CommandBarButton iconProps={addIcon} text="Nuevo" onClick={openModal} />
                    <SearchBox styles={searchBoxStyles} placeholder="Buscar" underlined={true} onChange={(event) => { _onChangeText(event) }} />
                </Stack>
            </div>
            {/* <Announced message={selectionDetails} /> */}
            <AssigmentsModal addStd={_addStd} isOpen={isModalOpen} onClose={hideModal} mode={modalData.mode} data={modalData.data} />
            {announcedMessage ? <Announced message={announcedMessage} /> : undefined}
            {isModalSelection ? (
                <MarqueeSelection selection={_selection}>
                    <DetailsList
                        items={items}
                        compact={isCompactMode}
                        columns={tableColumns}
                        //selectionMode={SelectionMode.multiple}
                        selectionMode={SelectionMode.single}
                        getKey={_getKey}
                        setKey="multiple"
                        layoutMode={DetailsListLayoutMode.justified}
                        isHeaderVisible={true}
                        selection={_selection}
                        selectionPreservedOnEmptyClick={true}
                        onItemInvoked={_onItemInvoked}
                        enterModalSelectionOnTouch={true}
                        ariaLabelForSelectionColumn="Toggle selection"
                        ariaLabelForSelectAllCheckbox="Toggle selection for all items"
                        checkButtonAriaLabel="Row checkbox"
                        checkboxVisibility={CheckboxVisibility.hidden}
                    />
                </MarqueeSelection>
            ) : (
                    <DetailsList
                        items={items}
                        compact={isCompactMode}
                        columns={tableColumns}
                        selectionMode={SelectionMode.none}
                        getKey={_getKey}
                        setKey="none"
                        layoutMode={DetailsListLayoutMode.justified}
                        isHeaderVisible={true}
                        onItemInvoked={_onItemInvoked}
                        selection={_selection}
                    />
                )}
        </Fabric>
    );

    function _copyAndSort<T>(items: T[], columnKey: string, isSortedDescending?: boolean): T[] {
        const key = columnKey as keyof T;
        console.log(items[0]);
        return items.slice(0).sort((a: T, b: T) => ((isSortedDescending ? a[key] < b[key] : a[key] > b[key]) ? 1 : -1));
    }
}

export default AssigmentsTable;







