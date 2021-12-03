import React, { useContext, useEffect, useState } from 'react';
import { LifeministryContext } from '../App';
import StudentsTable from '../components/students/studentsList';
import { IStudent } from '../types/ministry.types';

function Students() {
    const initialData: IStudent[] = [{ "id": 0, "name": "Initial", "gender": "m", "cel": 0, "active": false, "notes": "", "last": "2020-11-01T00:00:00Z", "lastpartner": 0 }];
    const [stdData, setStdData] = useState<IStudent[]>(initialData)
    const db: any = useContext(LifeministryContext)

    useEffect(() => {
        // Update the document title using the browser API
        console.log(db.getStudents().then((res: IStudent[]) => {
            console.log(res);
            setStdData(res);
        }));
        /* const stdUrl = "http://localhost:8000/students";
        console.log(stdUrl);
        fetch(stdUrl)
            .then((res) => res.json())
            .then((repos) => {
                console.log(repos)
                setStdData(repos as IStudent[])
            }); */
    }, [setStdData]);

    return (
        <StudentsTable data={stdData} />
    );
}

export default Students; 
