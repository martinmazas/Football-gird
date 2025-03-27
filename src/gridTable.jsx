import { Box } from "@mui/material";
import Cells from "./cells";

export default function GridTable(props) {
    return (
        <Box
            component="table"
            sx={{
                margin: {
                    xs: "5rem auto 0",
                    md: "7rem auto 0",
                    sm: "11rem auto 0"
                }
            }}
        >
            {props.gameParams.teams.length > 0 && <Cells props={props} />}
        </Box>
    );
}
