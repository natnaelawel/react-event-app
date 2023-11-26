import {
  CreateEventRequest,
  DeleteEventRequest,
  UpdateEventRequest,
} from "@/types/events";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const eventsApi = createApi({
  reducerPath: "eventsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/events" }),
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: ({ userId, from, to }) =>
        `/?${userId ? `userId=${userId}` : ""}${from ? `&from=${from}` : ""}${
          to ? `&to=${to}` : ""
        }`,
      providesTags: ["Events"],
    }),
    getEvent: builder.query({
      query: (id) => `/${id}`,
      providesTags: ["Events"],
    }),
    createEvent: builder.mutation({
      query: (body: CreateEventRequest) => ({
        url: "/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Events"],
    }),
    updateEvent: builder.mutation({
      query: ({ eventId, update }: UpdateEventRequest) => ({
        url: `/${eventId}`,
        method: "PUT",
        body: update,
      }),
      invalidatesTags: ["Events"],
    }),
    deleteEvent: builder.mutation({
      query: ({ eventId }: DeleteEventRequest) => ({
        url: `/${eventId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Events"],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetEventsQuery,
  useGetEventQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useDeleteEventMutation,
} = eventsApi;
