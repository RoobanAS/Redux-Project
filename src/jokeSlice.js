import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const fetchJoke = createAsyncThunk(
  "jokes/fetchJoke",
  async (category, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://api.chucknorris.io/jokes/random?category=${category}`
      );
      return response.data.value;
    } catch (error) {
      return rejectWithValue(category);
    }
  }
);

const fetchCategories = createAsyncThunk("jokes/fetchCategories", async () => {
  const response = await axios.get(
    "https://api.chucknorris.io/jokes/categories"
  );
  return response.data;
});

const initialState = {
  joke: "",
  loading: false,
  error: "",
  categories: [],
};

const jokeSlice = createSlice({
  name: "joke",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJoke.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchJoke.fulfilled, (state, action) => {
        state.joke = action.payload;
        state.loading = false;
      })
      .addCase(fetchJoke.rejected, (state, action) => {
        state.error = `Invalid category: "${action.payload}"`;
        state.loading = false;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

export default jokeSlice;
export { fetchJoke, fetchCategories };
