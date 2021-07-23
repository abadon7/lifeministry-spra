import React, { useEffect, useState } from 'react';
import { LifeministryContext } from '../App';
import AssigmentsTable from '../components/assigmanets/assgList';
import { IAssignment } from '../types/ministry.types';

function Assignments() {
    const initialData: IAssignment[] = [{ "id": 0, "name": "Initial", "type": "school", "participants": 0 }];
    const [stdData, setStdData] = useState<IAssignment[]>(initialData);
    const db: any = React.useContext(LifeministryContext);

    useEffect(() => {
        // Update the document title using the browser API
        /* const stdUrl = "http://localhost:8000/assigments";
        console.log(stdUrl);
        fetch(stdUrl)
            .then((res) => res.json())
            .then((repos) => {
                setStdData(repos as IAssignment[])
            }); */
        db.getAssignments().then((res: IAssignment[]) => {
            console.log(res);
            setStdData(res);
        });
    }, [setStdData]);

    return (
        <AssigmentsTable data={stdData} />
    );
}

export default Assignments; 
