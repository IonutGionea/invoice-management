import { createSlice, type PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface User { id: number; email: string; name?: string }

interface AuthState {
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
    error: null,
};

// Login thunk
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async ({ email, password }: { email: string; password: string }, { rejectWithValue }) => {
        try {
            const res = await axios.post('http://localhost:3000/auth/login', { email, password });
            localStorage.setItem('token', res.data.token); 
            return res.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);



const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout(state) {
            state.user = null;
            state.token = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<User & { token: string }>) => {
                state.loading = false;
                state.token = action.payload.token;
                state.user = { email: action.payload.email, id: action.payload.id, name: action.payload.name }

            })
            .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
                state.loading = false;
                state.error = action.payload;
            })

    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
