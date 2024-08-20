import { Box, Typography } from "@mui/material";

export const Error = () => {
  return (
    <Box
      height="100vh"
      width="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h4" sx={{ color: "white" }}>
        Uppss..Something went wrong
      </Typography>
    </Box>
  );
};
