import { Typography, Card, CardContent, CardMedia, CardActionArea, CardHeader, ButtonGroup, Button, CardActions } from '@mui/material';
import { Activity } from "../../../app/models/activity";

interface Props { 
    activity: Activity;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
}

export default function ActivityDetails(props: Props) {
    const {activity, openForm, cancelSelectActivity} = props;

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
                <Button variant="contained" onClick={() => openForm(activity.id)}>
                    Edit
                </Button>
                <Button onClick={cancelSelectActivity} variant="text">
                    Cancel
                </Button>
            </CardActions>
        </Card>
    );
}