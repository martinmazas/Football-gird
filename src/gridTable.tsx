import { Box } from "@mui/material";
import Cells from "./cells";
import { GridTableProps } from "./Types/types";

export default function GridTable(props: GridTableProps) {
  return (
    <Box component="table">
      {props.gameParams.teams.length > 0 && <Cells {...props} />}
    </Box>
  );
}
