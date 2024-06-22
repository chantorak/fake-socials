import { CircularProgress } from "@mui/material";

interface Props {
    inverted?: boolean;
    content: string;
}

export default function LoadingComponent({inverted = true, content = 'Loading...'} : Props) {
    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <CircularProgress content={content}></CircularProgress>
        </div>
    )
}