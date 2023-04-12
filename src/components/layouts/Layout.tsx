import { Box } from "@mui/material";
import { NextPage } from "next";
import Head from "next/head";
import { Navbar, Sidebar } from "../ui";

interface LayoutProps {
  title?: string;
  children: React.ReactNode;
}

export const Layout: NextPage<LayoutProps> = ({
  title = "Open Jira",
  children,
}) => {
  return (
    <Box sx={{ flexFlow: 1 }}>
      <Head>
        <title>{title}</title>
      </Head>

      <Navbar />
      <Sidebar />

      <Box sx={{ p: "10px 20px" }}>{children}</Box>
    </Box>
  );
};
