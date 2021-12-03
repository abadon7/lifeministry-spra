import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ScheduleIcon from '@material-ui/icons/Schedule';
import GroupIcon from '@material-ui/icons/Group';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const LifeministryContext: any = React.createContext("");

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}


export const Navigation = () => {

    return (
        <>
            <Divider />
            {/* <List>
                {['Generar', 'Estudiantes', 'Asiganciones'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List> */}
            <List>
                <ListItemLink href="#/" key={"assignments"}>
                    <ListItemIcon><ScheduleIcon /></ListItemIcon>
                    <ListItemText>Programar</ListItemText>
                </ListItemLink>
                <ListItemLink href="#estudiantes" key={"students"}>
                    <ListItemIcon><GroupIcon /></ListItemIcon>
                    <ListItemText>Estudiantes</ListItemText>
                </ListItemLink>
                <ListItemLink href="#asignaciones" key={"assignments"}>
                    <ListItemIcon><AssignmentIcon /></ListItemIcon>
                    <ListItemText>Asignaciones</ListItemText>
                </ListItemLink>
            </List>
        </>
    );
}
