import { Box, Container, Stack } from '@mui/material';
import ActivityList from './ActivityList';

export default function ActivityDashbaord() {
    return (
        <Container>
            <Box boxShadow={1} padding={0} >
                <ActivityList />
            </Box>
        </Container>
    );
}
