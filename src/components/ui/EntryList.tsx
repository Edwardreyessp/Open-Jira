import { List, Paper } from "@mui/material";
import { EntryCard } from "./EntryCard";
import { EntryStatus } from "@/interfaces";
import { NextPage } from "next";
import { useContext, useMemo } from "react";
import { EntriesContext } from "@/context/entries";
import { UIContext } from "@/context/ui";
import styles from "./EntryList.module.css";

interface EntryListProps {
  status: EntryStatus;
}

export const EntryList: NextPage<EntryListProps> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext);
  const { isDragging, endDragging } = useContext(UIContext);

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status]
  );

  const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const id = event.dataTransfer.getData("text/plain");

    const entry = entries.find((entry) => entry._id === id)!;
    entry.status = status;
    updateEntry(entry);
    endDragging();
  };

  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div
      className={isDragging ? styles.dragging : ""}
      onDrop={onDrop}
      onDragOver={allowDrop}
    >
      <Paper
        sx={{
          height: "calc(100vh - 180px)",
          overflow: "scroll",
          backgroundColor: "transparent",
          p: 1,
        }}
      >
        <List sx={{ opacity: isDragging ? 0.2 : 1, transition: "all .3s" }}>
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>
      </Paper>
    </div>
  );
};
