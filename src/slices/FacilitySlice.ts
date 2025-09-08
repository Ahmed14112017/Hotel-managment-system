import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Addfacility, ResponseFacilityData } from "../interfaces";

export const FacilityApi = createApi({
  reducerPath: "FacilityRoomapi",
  tagTypes: ["FacilityRoom"],
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
    GetAllFacility: build.query<ResponseFacilityData, void>({
      query: () => ({
        url: "/room-facilities",
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.facilities.map((facility) => ({
                type: "FacilityRoom" as const,
                id: facility._id,
              })),
              { type: "FacilityRoom", id: "List" },
            ]
          : [{ type: "FacilityRoom", id: "List" }],
    }),
    // GetFacilityDetails: build.query<ResponseFacilityData, string>({
    //   query: (id) => ({
    //     url: `/room-facilities/${id}`,
    //   }),
    // }),
    updateFacility: build.mutation<
      void,
      { id: string; updatedata: Addfacility }
    >({
      query: ({ id, updatedata }) => ({
        url: `/room-facilities/${id}`,
        method: "PUT",
        body: updatedata,
      }),
      invalidatesTags: [{ type: "FacilityRoom", id: "List" }],
    }),
    DeleteFacility: build.mutation<void, String>({
      query: (id) => ({
        url: `/room-facilities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "FacilityRoom", id: "List" }],
    }),
    AddFacility: build.mutation<void, Addfacility | string>({
      query: (CreatFacility) => ({
        url: "/room-facilities",
        method: "POST",
        body: CreatFacility,
      }),
      invalidatesTags: [{ type: "FacilityRoom", id: "List" }],
    }),
  }),
});

export const {
  useGetAllFacilityQuery,
  useDeleteFacilityMutation,
  useUpdateFacilityMutation,
  useAddFacilityMutation,
} = FacilityApi;
