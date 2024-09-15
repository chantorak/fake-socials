import { Stack, TextField, Button, CircularProgress } from "@mui/material";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import agent from "../../../app/api/agents";
import { useNavigate, useParams } from "react-router-dom";
import { Activity } from "../../../app/models/activity";

export default function EditForm() {
    const { id } = useParams();
    const { isFetching, refetch } = agent.getActivity(id);
    const { mutateAsync, isPending } = agent.editActivity();
    const naviagte = useNavigate();
    const [activity, setActivity] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    });

    useEffect(() => {
        if (id)
            refetch().then((res) => setActivity(res?.data as Activity));
    }, []);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        mutateAsync(activity).then(() => {
            naviagte(`/activity/${id}`);
        });
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setActivity({...activity, [name]: value });
    }

    if (isFetching) return <CircularProgress></CircularProgress>;

    return isPending ? <CircularProgress></CircularProgress> : <form onSubmit={handleSubmit} >
        <Stack spacing={1}>
            <TextField placeholder="Title" name="title" variant="outlined" fullWidth value={activity.title} onChange={handleInputChange} />

            <TextField placeholder="Description" name="description" variant="outlined" fullWidth value={activity.description} onChange={handleInputChange} />

            <TextField placeholder="Category" name="category" variant="outlined" fullWidth value={activity.category} onChange={handleInputChange} />

            <TextField type="date" placeholder="Date" name="date" variant="outlined" fullWidth value={activity.date} onChange={handleInputChange} />

            <TextField placeholder="City" name="city" variant="outlined" fullWidth value={activity.city} onChange={handleInputChange} />

            <TextField placeholder="Venue" name="venue" variant="outlined" fullWidth value={activity.venue} onChange={handleInputChange} />

            <Button fullWidth variant="contained" type="submit">Submit</Button>

            <Button fullWidth variant="contained" onClick={() => naviagte(`/activity/${id}`)}>Cancel</Button>
        </Stack>
    </form>
}