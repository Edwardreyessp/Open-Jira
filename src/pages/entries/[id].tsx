import { Layout } from "../../components/layouts";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Grid,
  Card,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
  capitalize,
  IconButton,
} from "@mui/material";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import { Entry, EntryStatus } from "@/interfaces";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useState, useMemo, useContext } from "react";
import { GetServerSideProps, NextPage } from "next";
import { dbEntries } from "@/database";
import { EntriesContext } from "@/context/entries";
import { useRouter } from "next/router";
import { dateFuncions } from "@/utils";

const validStatus: EntryStatus[] = ["pending", "in-progress", "finished"];

interface EntryPageProps {
  entry: Entry;
}

const EntryPage: NextPage<EntryPageProps> = ({ entry }) => {
  const { updateEntry } = useContext(EntriesContext);
  const [inputValue, setInputValue] = useState(entry.description);
  const [status, setStatus] = useState<EntryStatus>(entry.status);
  const [touch, setTouch] = useState(false);
  const router = useRouter();

  const isNotValid = useMemo(
    () => touch && inputValue.length === 0,
    [touch, inputValue]
  );

  const handleSave = () => {
    const updatedEntry: Entry = {
      ...entry,
      description: inputValue,
      status,
    };

    updateEntry(updatedEntry, true);
    router.push("/");
  };

  return (
    <Layout title={inputValue.substring(0, 20) + "..."}>
      <Grid container justifyContent="center" sx={{ mt: 2 }}>
        <Grid item xs={12} sm={8} md={6}>
          <Card>
            <CardHeader
              title="Entrada:"
              subheader={`Creada ${dateFuncions.getFormattedDate(
                entry.createdAt
              )}`}
            />
            <CardContent>
              <TextField
                sx={{ mt: 2, mb: 1 }}
                fullWidth
                placeholder="Nueva entrada"
                autoFocus
                multiline
                label="Nueva entrada"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onBlur={() => setTouch(true)}
                error={isNotValid}
                helperText={isNotValid && "Ingrese un valor"}
              />
              <FormControl>
                <FormLabel>Estado:</FormLabel>
                <RadioGroup
                  row
                  value={status}
                  onChange={(e) => setStatus(e.target.value as EntryStatus)}
                >
                  {validStatus.map((option) => (
                    <FormControlLabel
                      key={option}
                      value={option}
                      control={<Radio />}
                      label={capitalize(option)}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={<SaveRoundedIcon />}
                variant="contained"
                fullWidth
                onClick={handleSave}
                disabled={inputValue.length === 0}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
      <IconButton
        sx={{ position: "fixed", bottom: 30, right: 30, bgcolor: "red" }}
      >
        <DeleteRoundedIcon />
      </IconButton>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  const entry = await dbEntries.getEntryById(id);

  if (!entry) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      entry,
    },
  };
};

export default EntryPage;
