import { NextPage } from "next";
import { Card, CardHeader, CardContent, Grid } from "@mui/material";
import { Layout } from "@/components/layouts";
import { EntryList, NewEntry } from "@/components/ui";

const HomePage: NextPage = () => {
  return (
    <Layout title="Home Open Jira">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 84px)" }}>
            <CardHeader title="Pendientes" />
            <CardContent>
              <NewEntry />
              <EntryList status="pending" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 84px)" }}>
            <CardHeader title="En progreso" />
            <CardContent>
              <EntryList status="in-progress" />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: "calc(100vh - 84px)" }}>
            <CardHeader title="Completadas" />
            <CardContent>
              <EntryList status="finished" />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
};

export default HomePage;
