import './index.css';
import { useState, useEffect } from "react";
import { Activity } from '../models/activity';
import NavBar from './navbar';
import ActivityDashbaord from '../../features/activities/dashbaord/ActivityDashboard';
import { v4 as uuid } from "uuid";
import agent from '../api/agents';
import LoadingComponent from './LoadingComponent';

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
    const [editMode, setEditMode] = useState<Boolean>(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(true);

    useEffect(() => {
        agent.Acitivities.list().then(response => {
            response.forEach(act => {
                act.date = act.date.split('T')[0];
            });
            setActivities(response);
            setLoading(false);
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
        setSubmitting(true);
        if (activity.id) {
            setActivities([...activities.filter(x => x.id !== activity.id), activity]);
            setSelectedActivity(activity);
            setEditMode(false);
            setSubmitting(false);
        } else {
            activity.id = uuid();
            agent.Acitivities.create(activity).then(() => {
                setActivities([...activities, activity]);
                setSelectedActivity(activity);
                setEditMode(false);
                setSubmitting(false);
            })
        }
    }

    function handleDeleteActivity(id: string) {
        setSubmitting(true);
        agent.Acitivities.delete(id).then(() => {
            setActivities([...activities.filter(x => x.id !== id)]);
            setSubmitting(false);
        });
    }

    if (loading) return <LoadingComponent content='Loading app'></LoadingComponent>

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
                submitting={submitting}
            />
        </>
    )
}

export default App;
