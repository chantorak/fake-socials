import axios from 'axios';
import { List, ListItem } from '@mui/material';
import { People } from '@mui/icons-material';
import './App.css';
import { useState, useEffect } from "react";

function App() {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5163/api/activities')
            .then((response: any) => {
                setActivities(response.data);
            });
    }, []);

    return (
        <>
            <h1> <People /> Fake socials</h1>
            <List>
                {activities.map((activity: any) => (
                    <ListItem key={activity.id}>
                        {activity.title}
                    </ListItem>
                ))}
            </List>
        </>
    )
}

export default App
