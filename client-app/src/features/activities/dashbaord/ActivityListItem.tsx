import { ListItem, Grid, Typography, Button, CircularProgress } from "@mui/material";
import { Activity } from "../../../app/models/activity";
import { useNavigate } from "react-router-dom";
import agent from "../../../app/api/agents";

interface Props {
    activity: Activity;
}

export default function ActivityListItem(props: Props) {
    const { mutate, isPending } = agent.deleteActivity();
    const navigate = useNavigate();
    const activity = props.activity;

    function handleActivityDelete(id: string) {
        mutate(id);
    }

    if (isPending) return <CircularProgress></CircularProgress>

    return <ListItem>
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
                    onClick={() => navigate(`/activity/${activity.id}`)}
                    variant="contained"
                >
                    View
                </Button>
            </Grid>
        </Grid>
    </ListItem>
}