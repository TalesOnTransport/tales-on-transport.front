import { SET_BOOK_FOUND, SET_SCANNED_BOOK } from "../constants/constants";

const INITIAL_STATE = {
  book: {},
  bookFound: true
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SCANNED_BOOK:
      return {
        ...state,
        book: action.payload
      };

    case SET_BOOK_FOUND:
      return {
        ...state,
        bookFound: action.payload.bookFound
      };

    default:
      break;
  }
  return { ...state };
};

export default reducer;
