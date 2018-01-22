import { SET_BOOK_FOUND, SET_SCANNED_BOOK } from "../constants/constants";

export const setScannedBook = book => ({
  type: SET_SCANNED_BOOK,
  payload: book
});

export const setBookFound = bookFound => ({
  type: SET_BOOK_FOUND,
  payload: bookFound
});
