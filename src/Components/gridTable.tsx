import { Box } from "@mui/material";
import Cells from "./cells";
import { GameParams } from "../Types/types";

type GridTableProps = {
  gameParams: GameParams;
};

export default function GridTable({ gameParams }: GridTableProps) {
  return (
    <Box component="table">
      {gameParams.teams.length > 0 && <Cells gameParams={gameParams} />}
    </Box>
  );
}
