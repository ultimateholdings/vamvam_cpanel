import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../services/api/api.service";

const adminLogin = createAsyncThunk('adminLogin', async (data: any, thunkAPI) => {
    try {
        const response = await apiService.post("/auth/admin/login", data);
        return response.data;
    } catch (error: any) {
        throw thunkAPI.rejectWithValue(error);
    }
})

export { adminLogin }