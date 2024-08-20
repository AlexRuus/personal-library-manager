import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { AddBookModal } from "../ManagingBooksForms/AddBookModal";
import { useMediaQuery } from "@mui/system";

export const ApplicationBar = () => {
  const [openModal, setOpenModal] = React.useState(false);
  const mobile = useMediaQuery("(max-width:600px)");

  return (
    <AppBar
      position="static"
      sx={{
        background: "rgba(255, 255, 255, 0.25)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
      }}
    >
      <Toolbar>
        <Box
          display="flex"
          gap={0.5}
          onClick={() => setOpenModal(true)}
          flexGrow={1}
          sx={{ cursor: "pointer" }}
        >
          <AddOutlinedIcon />
          <Typography>Add new book</Typography>
        </Box>
        <Box display="flex" gap={1}>
          <AccountCircleIcon />
          {!mobile && <Typography>Mock user</Typography>}
        </Box>
      </Toolbar>
      <AddBookModal open={openModal} setOpen={setOpenModal} />
    </AppBar>
  );
};
