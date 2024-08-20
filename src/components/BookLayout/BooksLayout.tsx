import { useState } from "react";
import Grid from "@mui/material/Grid";
import useSWR from "swr";
import { getAllBooks } from "../../api/api";

import { Box, Typography } from "@mui/material";
import { UpdateBookModal } from "../ManagingBooksForms/UpdateBookModal";
import { BookCard } from "./BookCard";
import { Loading } from "../FeedbackComponents/Loading";
import { Error } from "../FeedbackComponents/Error";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";

export const BooksLayout = () => {
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [bookData, setBookData] = useState<any>({});

  const { data, isLoading, error } = useSWR(
    "http://localhost:3001/books",
    getAllBooks
  );

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  return (
    <Box padding={4}>
      <Grid container spacing={4} maxWidth={1600} justifyContent="center">
        {data && data.length > 0 ? (
          data.map((book, i) => (
            <Grid item xs={12} sm="auto" md="auto" key={book.id}>
              <BookCard
                book={book}
                key={i}
                setBookData={setBookData}
                setOpenUpdateModal={setOpenUpdateModal}
              />
            </Grid>
          ))
        ) : (
          <Box
            height="100vh"
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            gap={2}
          >
            <Typography variant="h4" color="white">
              Your library is currently empty
            </Typography>
            <SentimentVeryDissatisfiedIcon
              sx={{ fontSize: 40, color: "white" }}
            />
          </Box>
        )}

        <UpdateBookModal
          openUpdateModal={openUpdateModal}
          setOpenUpdateModal={setOpenUpdateModal}
          bookData={bookData}
        />
      </Grid>
    </Box>
  );
};
