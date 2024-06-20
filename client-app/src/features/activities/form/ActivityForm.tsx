import { Stack, TextField, Button } from "@mui/material";
import { Activity } from "../../../app/models/activity";
import { ChangeEvent, FormEvent, useState } from "react";

interface Props {
    activity?: Activity;
    closeForm: () => void;
    createOrEidt: (activity: Activity) => void;
}

export default function ActivityForm(props: Props) {
    const { activity: selectedActivity, closeForm } = props;

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    };

    const [activity, setActivity] = useState(initialState)

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        props.createOrEidt(activity);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    return <form onSubmit={handleSubmit}>
        <Stack spacing={1}>
            <TextField placeholder="Title" name="title" variant="outlined" fullWidth value={activity.title} onChange={handleInputChange} />

            <TextField placeholder="Description" name="description" variant="outlined" fullWidth value={activity.description} onChange={handleInputChange} />

            <TextField placeholder="Category" name="category"  variant="outlined" fullWidth value={activity.category} onChange={handleInputChange} />

            <TextField placeholder="Date" name="date" variant="outlined" fullWidth value={activity.date} onChange={handleInputChange} />

            <TextField placeholder="City" name="city" variant="outlined" fullWidth value={activity.city} onChange={handleInputChange} />

            <TextField placeholder="Venue" name="venue" variant="outlined" fullWidth value={activity.venue} onChange={handleInputChange} />

            <Button fullWidth variant="contained" type="submit">Submit</Button>

            <Button fullWidth variant="contained" onClick={closeForm}>Cancel</Button>
        </Stack>
    </form>
}