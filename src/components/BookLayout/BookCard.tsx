import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useMediaQuery } from "@mui/system";
import { BookType } from "../../api/responseTypes";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  IconButton,
  Popper,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteBook } from "../../api/api";
import { mutate } from "swr";

type Props = {
  book: BookType;
  setBookData: (any: any) => void;
  setOpenUpdateModal: (any: any) => void;
};

export const BookCard = ({ book, setBookData, setOpenUpdateModal }: Props) => {
  const mobile = useMediaQuery("(max-width:600px)");
  const [expanded, setExpanded] = React.useState(false);
  const [error, setError] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <Card
      sx={{
        minWidth: 275,
        maxWidth: mobile ? "100%" : 300,
        position: "relative",
        background: "rgba(255, 255, 255, 0.25)",
        boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
        backdropFilter: "blur(5px)",
        borderRadius: "10px",
      }}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="flex-end"
          position="absolute"
          right={0}
          top={0}
        >
          <IconButton
            onClick={() => {
              setBookData(book);
              setOpenUpdateModal(true);
            }}
            aria-label="update"
            sx={{ color: "white" }}
          >
            <EditIcon sx={{ fontSize: 16 }} />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={handleClick}
            sx={{ color: "white" }}
          >
            <DeleteIcon sx={{ fontSize: 16 }} />
            <Popper open={open} id={id} anchorEl={anchorEl}>
              <Box
                sx={{
                  p: 1,
                  bgcolor: "background.paper",
                  borderRadius: 5,
                  border: "1px solid grey",
                }}
              >
                <Typography>
                  Are you sure you want to delete the book?
                </Typography>
                <Box display="flex" width="100%" justifyContent="center" mt={2}>
                  <Button>Cancel</Button>
                  <Button
                    onClick={() => {
                      deleteBook(book.id)
                        .then((res) => {
                          setError(false);
                          mutate(
                            "http://localhost:3001/books",
                            (currentData: any) => {
                              return currentData.filter(
                                (item: any) => item.id !== book.id
                              );
                            },
                            false
                          );
                        })
                        .catch((e) => {
                          setError(true);
                          setTimeout(() => {
                            setError(false);
                          }, 3000);
                        });
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            </Popper>
          </IconButton>
        </Box>
        <Typography variant="h5" color="white" gutterBottom sx={{ mt: 2 }}>
          {book.title}
        </Typography>
        <Typography component="div" color="white">
          {book.author}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="white">
          {book.genre}
        </Typography>
      </CardContent>
      <Accordion
        onClick={() => setExpanded(!expanded)}
        sx={{
          background: "rgba(255, 255, 255, 0.25)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          {expanded ? "Hide description" : "Show description"}
        </AccordionSummary>
        <AccordionDetails>
          <Typography variant="body2">{book.description}</Typography>
        </AccordionDetails>
      </Accordion>
      {error && (
        <Alert severity="error" variant="standard" className="alert">
          Something went wrong!
        </Alert>
      )}
    </Card>
  );
};
