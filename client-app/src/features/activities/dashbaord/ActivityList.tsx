import { Button, Divider, List, ListItem, Typography, Unstable_Grid2 as Grid, Box } from '@mui/material';
import { Activity } from "../../../app/models/activity";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityList(props: Props) {
    return (
        <List>
            {props.activities.map((activity) => (
                <Box key={activity.id}>
                    <ListItem >
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
                                    {activity.title}
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                    {activity.category}
                                </Typography>
                            </Grid>
                            <Grid alignContent="end">
                                <Button color={"error"} onClick={() => props.deleteActivity(activity.id)} variant="contained">
                                    Delete
                                </Button>
                                <Button onClick={() => props.selectActivity(activity.id)} variant="contained">
                                    View
                                </Button>
                            </Grid>
                        </Grid>
                    </ListItem>
                    <Divider component="li" />
                </Box>
            ))}
        </List >
    )
}