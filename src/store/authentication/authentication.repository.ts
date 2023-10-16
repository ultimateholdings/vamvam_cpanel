import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "../../services/api/api.service";
import CustomErrorApi from "../../common/models/CustomErrorApi";

const adminLogin = createAsyncThunk('adminLogin', async (data: any) => {
    try {
        const response = await apiService.post("/auth/admin/login", data);
        return response.data;
    } catch (error: any) {
        throw new CustomErrorApi(error.response);
    }
})

export { adminLogin }