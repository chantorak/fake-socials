import { Divider, List, Box, CircularProgress } from '@mui/material';
import { Activity } from "../../../app/models/activity";
import agent from '../../../app/api/agents';
import ActivityListItem from './ActivityListItem';

export default function ActivityList() {
    const { data: activities = [], isFetching } = agent.getActivities();

    if (isFetching) 
        return <CircularProgress></CircularProgress>

    return (
        <List>
            {activities.map((activity: Activity) => (
                <Box key={activity.id}>
                        <ActivityListItem activity={activity}></ActivityListItem>
                    <Divider component="li" />
                </Box>
            ))}
        </List>
    );
}