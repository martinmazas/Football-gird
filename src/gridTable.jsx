import { Box } from "@mui/material";
import Cells from "./cells";

export default function GridTable(props) {
    return (
        <Box
            component="table"
            sx={{
                // margin: '1.5rem auto 0'
            }}
        >
            {props.gameParams.teams.length > 0 && <Cells props={props} />}
        </Box>
    );
}
