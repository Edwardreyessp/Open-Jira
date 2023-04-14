import { UIContext } from "@/context/ui";
import { Entry } from "@/interfaces";
import { dateFuncions } from "@/utils";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useContext } from "react";

interface EntryCardProps {
  entry: Entry;
}

export const EntryCard: NextPage<EntryCardProps> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext);
  const router = useRouter();

  const onDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("text/plain", entry._id);
    startDragging();
  };

  const onDragEnd = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.clearData();
    endDragging();
  };

  const handleClick = () => {
    router.push(`/entries/${entry._id}`);
  };

  return (
    <Card
      sx={{ mb: 1 }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea onClick={handleClick}>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "flex-end", pr: 2 }}>
          <Typography variant="body2">
            {dateFuncions.getFormattedDate(entry.createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  );
};
