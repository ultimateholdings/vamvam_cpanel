import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../services/api/api.service";
import { objectToFormData } from "../../utils/helpers/functions";

const driverRegister = createAsyncThunk('driverRegister', async (data: any, thunkAPI) => {
    try {
        const response = await apiService.post("/driver/register-intern", objectToFormData(data));
        return response.data;
    } catch (error: any) {
        throw thunkAPI.rejectWithValue(error);
    }
});

const newAdmi = createAsyncThunk('newAdmi', async (data: any, thunkAPI) => {
    try {
        const response = await apiService.post("/admin/new-admin", data);
        return response.data;
    } catch (error: any) {
        throw thunkAPI.rejectWithValue(error);
    }
});


export { driverRegister, newAdmi }