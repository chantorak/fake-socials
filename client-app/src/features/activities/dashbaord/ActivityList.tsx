import { Button, Divider, List, ListItem, Typography, Unstable_Grid2 as Grid, Box, CircularProgress } from '@mui/material';
import { Activity } from "../../../app/models/activity";
import { useState } from 'react';

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityList(props: Props) {
    const [target, setTarget] = useState('');

    function handleActivityDelete(id: string) {
        setTarget(id);
        props.deleteActivity(id);
    }

    return (
        <List>
            {props.activities.map((activity: Activity) => (
                <Box key={activity.id}>
                    {props.submitting && activity.id === target ? (
                        <CircularProgress />
                    ) : (
                        <ListItem>
                            <Grid container>
                                <Grid width={400}>
                                    <Typography variant="h5" color="text.secondary">
                                        {activity.title}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                        {activity.date}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                        {activity.description}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                        {activity.city}, {activity.venue}
                                    </Typography>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                        {activity.category}
                                    </Typography>
                                </Grid>
                                <Grid container alignContent="flex-end">
                                    <Button
                                        color="error"
                                        onClick={() => handleActivityDelete(activity.id)}
                                        variant="contained"
                                    >
                                        Delete
                                    </Button>
                                    <Button
                                        onClick={() => props.selectActivity(activity.id)}
                                        variant="contained"
                                    >
                                        View
                                    </Button>
                                </Grid>
                            </Grid>
                        </ListItem>
                    )}
                    <Divider component="li" />
                </Box>
            ))}
        </List>
    );
}