import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncMessage } from './messageSlice';

const API_BASE = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

export const cartSlice = createSlice({
	name: 'cart',
	initialState: {
		carts: [],
		total: 0,
		final_total: 0,
	},
	// action
	reducers: {
		updateCart(state, action) {
			state.carts = action.payload.carts;
			state.total = action.payload.total;
			state.final_total = action.payload.final_total;
		},
	},
});

export const createAsyncGetCart = createAsyncThunk(
	'cart/createAsyncGetCart',
	async (_, { dispatch }) => {
		try {
			const response = await axios.get(`${API_BASE}/api/${API_PATH}/cart`);
			dispatch(updateCart(response.data.data));
		} catch (error) {
			dispatch(createAsyncMessage(error.response.data));
		}
	},
);

export const { updateCart } = cartSlice.actions;

export default cartSlice.reducer;
