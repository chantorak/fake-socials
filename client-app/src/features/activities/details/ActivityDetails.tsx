import { Typography, Card, CardContent, CardMedia, CardHeader, Button, CardActions, CircularProgress } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import agent from '../../../app/api/agents';


export default function ActivityDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { isFetching, data: activity } = agent.getActivity(id);

    if (isFetching) return <CircularProgress></CircularProgress>;

    if (!activity) return <h3>The activity not found</h3>;

    return (
        <Card>
            <CardHeader
                title={activity.title}
                subheader={activity.date}
            />
            <CardMedia
                component="img"
                height="140"
                image={`/assets/categoryImages/${activity.category}.jpg`}
            />
            <CardContent>
                <CardHeader title={activity.title} />
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    {activity.date}
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                    {activity.description}
                </Typography>
            </CardContent>
            <CardActions className="hello">
                <Button variant="contained" onClick={() => navigate(`/edit-activity/${activity.id}`)}>
                    Edit
                </Button>
                <Button onClick={() => navigate(`/activities`)} variant="text">
                    Cancel
                </Button>
            </CardActions>
        </Card>
    );
}