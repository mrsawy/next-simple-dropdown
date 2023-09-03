import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCategoriesData } from "./CategoriesService";

const initialState = {
  parentCategories: [],
  selectedParentCategory: {},
  childCategories: [],
  selectedChildCategory: {},
  isError: false,
  isLoading: true,
  isSuccess: false,
  message: ``,
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (args, thunkAPI) => {
    try {
      return await getCategoriesData();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: initialState,
  reducers: {
    setSelectedParentCategory: (state, action) => {
      state.selectedParentCategory = action.payload;
    },
    setSelectedChildCategory: (state, action) => {
      state.selectedChildCategory = action.payload;
    },
    setChildCategories: (state, action) => {
      state.childCategories = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.isSuccess = false;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.parentCategories = action.payload.data.categories;
        state.childCategories = action.payload.data.categories.children;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = `${action.payload}`;
      });
  },
});

export default categoriesSlice.reducer;
export const {setChildCategories, setSelectedParentCategory, setSelectedChildCategory } = categoriesSlice.actions;
