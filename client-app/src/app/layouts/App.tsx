import axios from 'axios';
import './index.css';
import { useState, useEffect } from "react";
import { Activity } from '../models/activity';
import NavBar from './navbar';
import ActivityDashbaord from '../../features/activities/dashbaord/ActivityDashboard';
import { v4 as uuid } from "uuid";

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState<Boolean>(false);

    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5163/api/activities')
            .then((response) => {
                setActivities(response.data);
            });
    }, []);

    function handleSelectActivity(id: string) {
        setEditMode(false);
        setSelectedActivity(activities.find(x => x.id === id));
    }

    function handleCancelSelectActivity() {
        setSelectedActivity(undefined);
    }

    function handleFormOpen(id?: string) {
        id ? handleSelectActivity(id) : handleCancelSelectActivity();
        setEditMode(true);
    }

    function handleFormClose() {
        setEditMode(false);
    }

    function handleCreateOrEditAcitiy(activity: Activity) {
        activity.id 
            ? setActivities([...activities.filter(x => x.id !== activity.id), activity])
            : setActivities([...activities, {...activity, id: uuid()}]);
        setEditMode(false);
        setSelectedActivity(activity);
    }

    function handleDeleteActivity(id: string) {
        setActivities([...activities.filter(x => x.id !== id)]);
    }

    return (
        <>
            <NavBar openForm={handleFormOpen} />
            <ActivityDashbaord 
                activities={activities}
                selectedActivity={selectedActivity}
                selectActivity={handleSelectActivity}
                cancelSelectActivity={handleCancelSelectActivity}
                openForm={handleFormOpen}
                closeForm={handleFormClose}
                editMode={editMode}
                createOrEidt={handleCreateOrEditAcitiy}
                deleteActivity={handleDeleteActivity}
            />
        </>
    )
}

export default App
