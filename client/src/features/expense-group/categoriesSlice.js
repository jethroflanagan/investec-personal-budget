import { createSlice, createSelector } from '@reduxjs/toolkit';
import { api } from 'src/features/api/ApiService';
import { setAppLoaded } from 'src/features/loader/loaderSlice';

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
  },
  reducers: {
    setCategories(state, action) {
      action.payload.map((category) => state[category.id] = category)
    }
  },
});

const { setCategories } = categoriesSlice.actions;

export const fetchAllCategories = () => async dispatch => {
  const categories = await api.getAllCategories();

  const payload = categories.map(data => {
    const { name, id } = data;
    return {
      name,
      id,
    };
  })

  dispatch(setCategories(payload));
  dispatch(setAppLoaded('categories'));
}

export const getCategories = state => state.categories;

export const selectCategoriesById = createSelector([getCategories], (categories) => categories);

export const selectSortedCategories = createSelector([getCategories], (categories) => {
  return Object.values(categories).sort((a, b) => a.name > b.name)
});


export default categoriesSlice.reducer;
