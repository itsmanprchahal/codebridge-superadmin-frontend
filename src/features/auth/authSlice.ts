import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/axios";
import type { AuthResponse } from "./types";
import { useNavigate } from "react-router-dom";

interface AuthState {
    user: AuthResponse["user"] | null;
    token: string | null;
    loading: boolean;
}

const initialState: AuthState = {
    user: JSON.parse(localStorage.getItem("user") || "null"),
    token: localStorage.getItem("token"),
    loading: false,
};

// =========================
// LOGIN
// =========================

export const loginAdmin = createAsyncThunk<
    AuthResponse,
    { email: string; password: string },
    { rejectValue: string }
>(
    "auth/loginAdmin",
    async (data, thunkAPI) => {
    // const navigate = useNavigate();

        try {
            const res = await API.post("/admin/login", data);
            // navigate("/admin/dashboard");
            
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Login failed"
            );
        }
    }
);

// =========================
// SIGNUP
// =========================

export const signupAdmin = createAsyncThunk<
    AuthResponse,
    { fullname: string; email: string; password: string; confirmpassword: string },
    { rejectValue: string }
>(
    "auth/signupAdmin",
    async (data, thunkAPI) => {
        try {
            const res = await API.post("/admin/signup", data);
            console.log("helllo")
            return res.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Signup failed"
            );
        }
    }
);

// =========================
// SLICE
// =========================

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;

            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },

    extraReducers: (builder) => {
        builder

            // =========================
            // LOGIN
            // =========================

            .addCase(loginAdmin.pending, (state) => {
                state.loading = true;
            })

            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false;

                state.user = action.payload.user;
                state.token = action.payload.token;

                localStorage.setItem("token", action.payload.token);
                localStorage.setItem(
                    "user",
                    JSON.stringify(action.payload.user)
                );
            })

            .addCase(loginAdmin.rejected, (state) => {
                state.loading = false;
            })

            // =========================
            // SIGNUP
            // =========================

            .addCase(signupAdmin.pending, (state) => {
                state.loading = true;
            })

            .addCase(signupAdmin.fulfilled, (state, action) => {
                state.loading = false;

                state.user = action.payload.user;
                state.token = action.payload.token;
            })

            .addCase(signupAdmin.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;