const INITIAL_STATE = {
  // scannedId: ""
};

const reducer = (state = INITIAL_STATE, action) => {
  console.log("in reducer state, action", state, action);
  switch (action.type) {
    case "UPDATE_SCANNED_ID":
      console.log("In update scanned it", state, action);
      // return {
      //   ...state,
      //   scannedId: action.payload
      // };
      break;

    default:
      break;
  }
  return { ...state };
};

export default reducer;
