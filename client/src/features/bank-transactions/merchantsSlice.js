import { createSelector, createSlice } from '@reduxjs/toolkit';
import { api } from 'src/features/api/ApiService';
import { setAppLoaded } from 'src/features/loader/loaderSlice';

export const merchantsSlice = createSlice({
  name: 'merchants',
  initialState: {
    byId: {},
  },
  reducers: {
    setMerchants(state, action) {
      action.payload.map((merchant) => state.byId[merchant.id] = merchant)
    },
  },
});

const { setMerchants, setLoader } = merchantsSlice.actions;

export const fetchAllMerchants = () => async dispatch => {
  const merchants = await api.getAllMerchants();

  const payload = merchants.map(data => {
    const { name, city, countryCode, code, id } = data;
    return {
      name,
      city, 
      countryCode,
      id,
      code
    };
  })

  dispatch(setMerchants(payload));
  dispatch(setAppLoaded('merchants'));
}

export const getMerchants = state => {
  return state.merchants.byId;
}
export const getMerchantsLoader = (state) => state.merchants.loader;

export const selectLoader = createSelector([getMerchantsLoader], (loader) => loader);

export const selectAllMerchantIds = createSelector([getMerchants], (merchants) => Object.keys(merchants));

export const selectMerchantsById = createSelector([getMerchants], (merchants) => {
  return merchants;
});

export default merchantsSlice.reducer;
