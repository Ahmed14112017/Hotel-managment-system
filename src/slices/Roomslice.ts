// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { ResponseRoomdata } from "../interfaces";

// export const RoomApi = createApi({
//   reducerPath: "api",
//   tagTypes: ["Roomapi"],
//   baseQuery: fetchBaseQuery({
//     baseUrl: "https://upskilling-egypt.com:3000/api/v0/admin",
//     prepareHeaders: (header) => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         header.set("Authorization", `Bearer ${token}`);
//       }
//     },
//   }),

//   endpoints: (build) => ({
//     getAllRooms: build.query<ResponseRoomdata, { page: number; size: number }>({
//       query: ({ page = 1, size = 10 }) => ({
//         url: `/rooms?page=${page}&size=${size}`,
//       }),
//       providesTags: (result) =>
//         result
//           ? [
//               ...result.data.rooms.map((room) => ({
//                 type: "Roomapi" as const,
//                 id: room._id,
//               })),
//               { type: "Roomapi", id: "List" },
//             ]
//           : [{ type: "Roomapi", id: "List" }],
//     }),
//     Deleteseslectroom: build.mutation<void, string>({
//       query: (id) => ({
//         url: `/rooms/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: [{ type: "Roomapi", id: "List" }],
//     }),
//     UpdateRooms: build.mutation<void, string>({
//       query: (id) => ({
//         url: `/rooms/${id}`,
//         method:"PUT"
//       }),
//       invalidatesTags:[{type:"Roomapi",id:"List"}]
//     }),
//   }),
// });

// export const { useDeleteseslectroomMutation, useGetAllRoomsQuery,useUpdateRoomsMutation } = RoomApi;
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ResponseRoomdata } from "../interfaces";

export const RoomApi = createApi({
  reducerPath: "api",
  tagTypes: ["RoomDataApi"],

  baseQuery: fetchBaseQuery({
    baseUrl: "https://upskilling-egypt.com:3000/api/v0/admin",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    },
  }),
  endpoints: (build) => ({
    GetAllRooms: build.query<ResponseRoomdata, { page: number; size: number }>({
      query: ({ page = 1, size = 10 }) => ({
        url: `/rooms?page=${page}&size=${size}`,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.data.rooms.map((room) => ({
                type: "RoomDataApi" as const,
                id: room._id,
              })),
              { type: "RoomDataApi", id: "List" },
            ]
          : [{ type: "RoomDataApi", id: "List" }],
    }),
    deleteSelectRoom: build.mutation<void, string>({
      query: (id) => ({
        url: `/rooms/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "RoomDataApi", id: "List" }],
    }),
    UpdateSelectRoom: build.mutation<
      void,
      { id: string; updateProduct: FormData }
    >({
      query: ({ id, updateProduct }) => ({
        url: `/rooms/${id}`,
        method: "PUT",
        body: updateProduct,
      }),
      invalidatesTags: [{ type: "RoomDataApi", id: "List" }],
    }),
    AddNewRoom: build.mutation<void, { Addroom: FormData }>({
      query: ({ Addroom }) => ({
        url: "/rooms",
        method: "POST",
        body: Addroom,
      }),
      invalidatesTags: [{ type: "RoomDataApi", id: "List" }],
    }),
  }),
});

export const {
  useDeleteSelectRoomMutation,
  useGetAllRoomsQuery,
  useUpdateSelectRoomMutation,
  useAddNewRoomMutation,
} = RoomApi;
