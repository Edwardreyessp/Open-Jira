import { UIContext } from "@/context/ui";
import { Entry } from "@/interfaces";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { useContext } from "react";

interface EntryCardProps {
  entry: Entry;
}

export const EntryCard: NextPage<EntryCardProps> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text/plain", entry._id);
    startDragging();
  };

  const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.clearData();
    endDragging();
  };

  return (
    <Card
      sx={{ mb: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", pr: 2 }}>
          <Typography variant="body2">Hace 30min</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
