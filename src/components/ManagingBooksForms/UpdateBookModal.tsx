import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Alert, TextField, useMediaQuery } from "@mui/material";
import { useFormik } from "formik";
import { YupValidationSchema } from "../../utils";
import { updateExistingBook } from "../../api/api";
import { BookType } from "../../api/responseTypes";
import { mutate } from "swr";
import { modalDefaultStyle } from "./ModalStyle";
import { useState } from "react";

interface Props {
  openUpdateModal: boolean;
  setOpenUpdateModal: (any: any) => void;
  bookData: BookType;
}

export const UpdateBookModal = ({
  openUpdateModal,
  setOpenUpdateModal,
  bookData,
}: Props) => {
  const handleClose = () => setOpenUpdateModal(false);
  const mobile = useMediaQuery("(max-width:600px)");
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: {
      title: bookData.title || "",
      author: bookData.author || "",
      genre: bookData.genre || "",
      description: bookData.description || "",
    },
    enableReinitialize: true,

    validationSchema: YupValidationSchema,
    onSubmit: (newBook) => {
      updateExistingBook(bookData.id, newBook)
        .then((res) => {
          handleClose();
          mutate(
            "http://localhost:3001/books",
            (books: any) => {
              return books.map((item: any) =>
                item.id === bookData.id ? { ...item, ...newBook } : item
              );
            },
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
      open={openUpdateModal}
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
        <Typography variant="h5">Update your selected book</Typography>
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
            Something went wrong when trying to update
          </Alert>
        )}

        <Box display="flex" justifyContent="center" gap={4}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button color="primary" variant="contained" type="submit">
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
