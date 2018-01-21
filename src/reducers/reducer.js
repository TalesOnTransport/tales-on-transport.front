const INITIAL_STATE = {
  book: {}
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_SCANNED_BOOK":
      return {
        ...state,
        book: action.payload
      };

    default:
      break;
  }
  return { ...state };
};

export default reducer;
