import axiosLib from "axios";
import { BookType, BookTypeUpdate } from "./responseTypes";

const axios = axiosLib.create({ baseURL: "http://localhost:3001" });

export const getAllBooks = (): Promise<BookType[]> => {
  return axios
    .get("/books")
    .then((res) => res.data)
    .catch((e) => {
      throw e;
    });
};

export const addBook = (payload: any): Promise<any> => {
  return axios
    .post("/books", payload)
    .then((res) => res)
    .catch((e) => {
      throw e;
    });
};

export const updateExistingBook = (
  bookID: number,
  payload: BookTypeUpdate
): Promise<any> => {
  return axios
    .put(`/books/${bookID}`, payload)
    .then((res) => res)
    .catch((e) => {
      throw e;
    });
};

export const deleteBook = (bookID: number): Promise<any> => {
  return axios
    .delete(`/books/${bookID}`)
    .then((res) => res)
    .catch((e) => {
      throw e;
    });
};
