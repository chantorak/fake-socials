import { RouteObject, createBrowserRouter } from "react-router-dom";
import App from "../layouts/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashbaord from "../../features/activities/dashbaord/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import CreateForm from "../../features/activities/form/CreateForm";
import EditForm from "../../features/activities/form/EditForm";

export const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {path: '', element: <HomePage />},
            {path: 'activities', element: <ActivityDashbaord />},
            {path: 'create-activity', element: <CreateForm />},
            {path: 'edit-activity/:id', element: <EditForm />},
            {path: 'activity/:id', element: <ActivityDetails />}
        ]
    }
];

export const router = createBrowserRouter(routes);
