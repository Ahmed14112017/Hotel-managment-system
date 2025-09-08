import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  Advertisementdatahandel,
  Advertisementdatahandelupdata,
  ResponseAdvertisment,
} from "../interfaces";

export const Advertisementslice = createApi({
  reducerPath: "Advertisementsliceapi",
  tagTypes: ["Advertisementapi"],
  baseQuery: fetchBaseQuery({
    baseUrl: "https://upskilling-egypt.com:3000/api/v0/admin",
    prepareHeaders: (header) => {
      const token = localStorage.getItem("token");
      if (token) {
        header.set("Authorization", `Bearer ${token}`);
      }
      return header;
    },
  }),
  endpoints: (build) => ({
    getAllads: build.query<ResponseAdvertisment, void>({
      query: () => ({
        url: "/ads",
      }),
      providesTags: (result) =>
        result?.data?.ads
          ? [
              ...result.data.ads.map((adv) => ({
                type: "Advertisementapi" as const,
                id: adv._id,
              })),
              { type: "Advertisementapi", id: "List" },
            ]
          : [{ type: "Advertisementapi", id: "List" }],
    }),
    DeleteAdvertisement: build.mutation<void, string>({
      query: (id) => ({
        url: ` https://upskilling-egypt.com:3000/api/v0/admin/ads/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Advertisementapi", id: "List" }],
    }),
    AddAdvertisement: build.mutation<
      ResponseAdvertisment,
      Advertisementdatahandel
    >({
      query: (data) => ({
        url: `https://upskilling-egypt.com:3000/api/v0/admin/ads`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Advertisementapi", id: "List" }],
    }),
    UpdateAdvertisement: build.mutation<
      void,
      { id: string; updatadata: Advertisementdatahandelupdata }
    >({
      query: ({ id, updatadata }) => ({
        url: `https://upskilling-egypt.com:3000/api/v0/admin/ads/${id}`,
        method: "PUT",
        body: updatadata,
      }),
      invalidatesTags: [{ type: "Advertisementapi", id: "List" }],
    }),
  }),
});
export const {
  useGetAlladsQuery,
  useDeleteAdvertisementMutation,
  useAddAdvertisementMutation,
  useUpdateAdvertisementMutation,
} = Advertisementslice;
