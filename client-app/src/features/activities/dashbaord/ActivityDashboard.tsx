import { Box, Stack } from '@mui/material';
import ActivityList from './ActivityList';
import ActivityDetails from '../details/ActivityDetails';
import { Activity } from '../../../app/models/activity';
import ActivityForm from '../form/ActivityForm';

interface Props {
    activities: Activity[];
    selectedActivity?: Activity;
    selectActivity: (id: string) => void;
    cancelSelectActivity: () => void;
    openForm: (id: string) => void;
    closeForm: () => void;
    editMode: Boolean;
    createOrEidt: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default function ActivityDashbaord(props: Props) {
    return (
        <Stack sx={{ marginTop: 4 }} alignItems="center" direction="column">
            <Stack direction="row" spacing={4} padding={0}>
                <Box boxShadow={1} padding={0} >
                    <ActivityList 
                        activities={props.activities}
                        selectActivity={props.selectActivity}
                        deleteActivity={props.deleteActivity}
                        submitting={props.submitting}
                    />
                </Box>
                <Box padding={0} minWidth={350}>
                    <Stack spacing={2}>
                        {props.selectedActivity && !props.editMode ?
                            <ActivityDetails
                                activity={props.selectedActivity}
                                cancelSelectActivity={props.cancelSelectActivity}
                                openForm={props.openForm}
                            /> : <></>
                        }
                        {props.editMode ?
                            <Box boxShadow={1} padding={2}>
                                <ActivityForm
                                    activity={props.selectedActivity}
                                    closeForm={props.closeForm}
                                    createOrEidt={props.createOrEidt}
                                    submitting={props.submitting}
                                />
                            </Box> : <></>
                        }
                    </Stack>
                </Box>
            </Stack>
        </Stack>
    );
}
