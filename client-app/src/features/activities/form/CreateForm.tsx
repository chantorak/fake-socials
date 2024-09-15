import { Stack, TextField, Button, CircularProgress } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import useStore from "../../../app/store/store";
import agent from "../../../app/api/agents";
import { redirect } from "react-router-dom";

export default function ActivityForm() {
    const { closeForm, activity: selectedActivity } = useStore();
    const { mutate } = agent.createActivity();
    const { isPending } = agent.createActivity();

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
        mutate(activity);
        redirect("/activities");
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setActivity({ ...activity, [name]: value });
    }

    return isPending ? <CircularProgress></CircularProgress> : <form onSubmit={handleSubmit} >
        <Stack spacing={1}>
            <TextField placeholder="Title" name="title" variant="outlined" fullWidth value={activity.title} onChange={handleInputChange} />

            <TextField placeholder="Description" name="description" variant="outlined" fullWidth value={activity.description} onChange={handleInputChange} />

            <TextField placeholder="Category" name="category"  variant="outlined" fullWidth value={activity.category} onChange={handleInputChange} />

            <TextField type="date" placeholder="Date" name="date" variant="outlined" fullWidth value={activity.date} onChange={handleInputChange} />

            <TextField placeholder="City" name="city" variant="outlined" fullWidth value={activity.city} onChange={handleInputChange} />

            <TextField placeholder="Venue" name="venue" variant="outlined" fullWidth value={activity.venue} onChange={handleInputChange} />

            <Button fullWidth variant="contained" type="submit">Submit</Button>

            <Button fullWidth variant="contained" onClick={closeForm}>Cancel</Button>
        </Stack>
    </form>
}