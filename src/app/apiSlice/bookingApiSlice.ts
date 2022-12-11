import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const bookingApi=createApi({
    reducerPath: "bookingApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${process.env.NEXT_PUBLIC_APIURL}/booking`,
        prepareHeaders:(headers,{getState})=>{
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = (getState() as RootState).auth?.loggedInUser?.token;

        if (token) { 
          headers.set("Authorization", `Bearer ${token}`);
        }
         headers.set("Content-Type", `application/json`);
         return headers;
    }
    }),
    tagTypes: ["Booking"], 
    endpoints:(builder)=>({
        bookingCreate:builder.mutation<{},{}>({
            query:(data)=>({
                url: "/",
                method: "POST",
                body: JSON.stringify(data),
            }), 
            invalidatesTags: ["Booking"]
        }),
        bookingGetByUserId: builder.query<[], any>({ 
            query: (userId)=>`/${userId}`,
            providesTags: ["Booking"],
        }),
        bookingDelete: builder.mutation<{}, {}>({
            query: (data:any) => ({
              url: `/${data?.bookingId}`,
              method: "delete",
              body: JSON.stringify(data),
            }),
         invalidatesTags: ["Booking"],
        }),
    }),
 

}) 

export const {
    useBookingCreateMutation,
    useBookingGetByUserIdQuery,
    useBookingDeleteMutation
} = bookingApi;
  