import { createSlice } from '@reduxjs/toolkit';

//import { HandleVerify } from '../../services/authServices';

//const initialState = await HandleVerify();

const initialState = {
    name: '',
    email: '',
    created_at: '',
    permissions: [],
    status: false
}

const auth = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login (state, action) {
            state.name = action?.payload?.resAPI?.name;
            state.email = action?.payload?.resAPI?.email;
            state.created_at = action?.payload?.resAPI?.created_at;
            state.permissions = action?.payload?.resAPI?.permissions;
            state.status = true;
        },
        logout (state, action) {
            state.name = '';
            state.email = '';
            state.created_at = '';
            state.permissions = [];
            state.status = false;
        }
    }
});

export default auth.reducer;

export const { login, logout } = auth.actions;