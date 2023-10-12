import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../services/api/api.service";
import CustomErrorApi from "../../common/models/CustomErrorApi";

const driverRegister = createAsyncThunk('driverRegister', async (data: any) => {
    try {
        const response = await apiService.post("/driver/register", data);
        return response
    } catch (error: any) {
        throw new CustomErrorApi(error.response);
    }
});

const newAdmi = createAsyncThunk('newAdmi', async (data: any) => {
    try {
        const response = await apiService.post("/admin/new-admin", data);
        return response
    } catch (error: any) {
        throw new CustomErrorApi(error.response);
    }
});

export { driverRegister, newAdmi }