import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Ilogin, Responsedata } from "../interfaces";
import axios, { AxiosError } from "axios";
import { UserUrlBase } from "../Endpoint";
import type { RootState } from "../Store";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

interface ResponseDataApi {
  pending: boolean;
  data: Responsedata | null;
  error: string | null;
}
const responsedataapi: ResponseDataApi = {
  pending: false,
  data: null,
  error: null,
};
export const fetchuserdata = createAsyncThunk<Responsedata, Ilogin>(
  "user/fetchuser",
  async (data, thunkapi) => {
    const { rejectWithValue } = thunkapi;
    try {
      const response = await axios.post(`${UserUrlBase.login}`, data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;

      return rejectWithValue(error?.response?.data?.message);
    }
  }
);

const loginuser = createSlice({
  initialState: responsedataapi,
  name: "users",
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchuserdata.pending, (state) => {
        state.pending = true;
      })
      .addCase(
        fetchuserdata.fulfilled,
        (state, action: PayloadAction<Responsedata>) => {
          (state.pending = false), (state.data = action.payload);
          const jwttoken = state.data.data.token;
          const token = jwttoken.slice(7);
          localStorage.setItem("token", token);
          const decodedtoken = jwtDecode(token);
          console.log(decodedtoken);
          toast("login is successfully");
        }
      )
      .addCase(fetchuserdata.rejected, (state, action) => {
        (state.pending = false),
          (state.data = null),
          (state.error = action.payload as string);
        toast.error(state.error);
      });
  },
});
export const getuserselector = (state: RootState) => state.users;
export default loginuser.reducer;
