import { Box, CircularProgress } from "@mui/material";

export const Loading = () => {
  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress sx={{ color: "white" }} />
    </Box>
  );
};
