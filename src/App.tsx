import { Box } from "@mui/material";
import { ApplicationBar } from "./components/ApplicationBar/ApplicationBar";
import { BooksLayout } from "./components/BookLayout/BooksLayout";

function App() {
  return (
    <Box textAlign="center">
      <ApplicationBar />
      <BooksLayout />
    </Box>
  );
}

export default App;
