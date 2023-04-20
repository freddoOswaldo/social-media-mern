import { createSlice } from "@reduxjs/toolkit";
import constants from "utils/constants";

const initialState = {
  mode: constants.LIGHT,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setMode: (state) =>
      void (state.mode =
        state.mode === constants.LIGHT ? constants.DARK : constants.LIGHT),
  },
});

export const { setMode } = themeSlice.actions;
export default themeSlice.reducer;
