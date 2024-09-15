import axios, { AxiosResponse } from "axios";
import { Activity } from "../models/activity";
import { useQuery, useMutation } from "@tanstack/react-query";
import useStore from "../store/store";
import { v4 as uuid } from "uuid";
import { QueryClient } from '@tanstack/react-query'

axios.defaults.baseURL = 'http://localhost:5163/api/';

const queryClient = new QueryClient()

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

axios.interceptors.response.use(async response => {
    await sleep(2000);
    return response;
});

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Acitivities = {
    list: () => request.get<Activity[]>('/activities'),
    details: (id?: string) => request.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => request.post<Activity[]>('/activities', activity),
    update: (activity: Activity) => request.put<Activity[]>(`/activities/${activity.id}`, activity),
    delete: (id: string) => request.delete<Activity[]>(`/activities/${id}`)
}


function getActivities() {
    return useQuery({
        queryKey: ['activities'],
        queryFn: () => Acitivities.list().then(response => {
            response.forEach(act => {
                act.date = act.date.split('T')[0];
            });

            useStore.setState({ activities: response });
            return response;
        }),
        staleTime: Infinity,
    });
}

function deleteActivity() {
    return useMutation({
        mutationKey: ['deleteActivity'],
        mutationFn: (id: string) => Acitivities.delete(id),
        onSuccess: () => {
            queryClient.refetchQueries({ queryKey: ["activities"] });
        },
    });
}

function createActivity() {
    return useMutation({
        mutationKey: ['createActivity'],
        mutationFn: (activity: Activity) => Acitivities.create({ ...activity, id: uuid() }),
    });
}

function editActivity() {
    return useMutation({
        mutationKey: ['editActivity'],
        mutationFn: (activity: Activity) => Acitivities.update(activity),
    });
}

function getActivity(id?: string, enabled = true) {
    return useQuery({
        queryKey: [`activtiy-${id}`],
        queryFn: () => Acitivities.details(id).then(response => {
            response.date = response.date.split('T')[0];

            useStore.setState({ activity: response });
            return response;
        }),
        staleTime: 100000,
        enabled
    });
}

const agent = {
    Acitivities,
    getActivity,
    getActivities,
    deleteActivity,
    createActivity,
    editActivity,
    queryClient
}

export default agent;
