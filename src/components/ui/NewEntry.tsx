import { Button, Box, TextField } from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import { useState, useContext } from "react";
import { EntriesContext } from "@/context/entries";
import { UIContext } from "@/context/ui";

export const NewEntry = () => {
  const [inputValue, setInputValue] = useState("");
  const [touched, setTouched] = useState(false);
  const { addNewEntry } = useContext(EntriesContext);
  const { isAddingEntry, setIsAddingEntry } = useContext(UIContext);

  const handleSave = () => {
    if (inputValue.length === 0) return;
    addNewEntry(inputValue);
    handleCancel();
  };

  const handleCancel = () => {
    setIsAddingEntry(false);
    setInputValue("");
    setTouched(false);
  };

  return (
    <Box sx={{ mb: 2 }}>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ my: 1 }}
            placeholder="Nueva entrada"
            autoFocus
            multiline
            label="Nueva entrada"
            helperText={
              touched && inputValue.length === 0 && "Ingrese un valor"
            }
            error={touched && inputValue.length === 0}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={() => setTouched(true)}
          />
          <Box display="flex" justifyContent="space-between">
            <Button variant="text" onClick={handleCancel}>
              Cancelar
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              endIcon={<SaveRoundedIcon />}
              onClick={handleSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddCircleRoundedIcon />}
          fullWidth
          variant="outlined"
          onClick={() => setIsAddingEntry(true)}
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  );
};
