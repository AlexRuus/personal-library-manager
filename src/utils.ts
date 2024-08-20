import * as Yup from "yup";

export const YupValidationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(3, "Title should be at least 3 characters long"),
  author: Yup.string()
    .required("Author is required")
    .min(3, "Author should be at least 3 characters long"),
  genre: Yup.string()
    .required("Genre is required")
    .min(3, "Genre should be at least 3 characters long"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description should be at least 10 characters long"),
});
