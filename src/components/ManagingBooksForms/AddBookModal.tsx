import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Alert, TextField, useMediaQuery } from "@mui/material";
import { useFormik } from "formik";
import { YupValidationSchema } from "../../utils";
import { addBook } from "../../api/api";
import { mutate } from "swr";
import { modalDefaultStyle } from "./ModalStyle";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen: (any: any) => void;
}

export const AddBookModal = ({ open, setOpen }: Props) => {
  const handleClose = () => {
    setOpen(false);
    formik.resetForm();
  };
  const mobile = useMediaQuery("(max-width:600px)");
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      genre: "",
      description: "",
    },
    validationSchema: YupValidationSchema,
    onSubmit: (values) => {
      addBook(values)
        .then((res) => {
          handleClose();
          mutate(
            "http://localhost:3001/books",
            (currentData: any) => [...currentData, values],
            false
          );
        })
        .catch((e) => {
          setError(true);
          setTimeout(() => {
            setError(false);
          }, 6000);
        });
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        display="flex"
        flexDirection="column"
        component="form"
        noValidate
        onSubmit={formik.handleSubmit}
        sx={{ ...modalDefaultStyle, width: mobile ? "80%" : 400 }}
      >
        <Typography variant="h5">Add a new book to your collection</Typography>
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
        />
        <TextField
          fullWidth
          id="author"
          name="author"
          label="Author"
          value={formik.values.author}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.author && Boolean(formik.errors.author)}
          helperText={formik.touched.author && formik.errors.author}
        />
        <TextField
          fullWidth
          id="genre"
          name="genre"
          label="Genre"
          value={formik.values.genre}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.genre && Boolean(formik.errors.genre)}
          helperText={formik.touched.genre && formik.errors.genre}
        />
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          multiline
          rows={4}
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.description && Boolean(formik.errors.description)
          }
          helperText={formik.touched.description && formik.errors.description}
        />
        {error && (
          <Alert variant="outlined" severity="error">
            Something went wrong when trying to add a book
          </Alert>
        )}
        <Box display="flex" justifyContent="center" gap={4}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="primary" variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
