import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const reviewApi=createApi({
    reducerPath: "reviewApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${process.env.NEXT_PUBLIC_APIURL}/review`,
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
    tagTypes: ["Review"], 
    endpoints:(builder)=>({
        reviewCreate:builder.mutation<{},{}>({
            query:(data)=>({
                url: "/",
                method: "POST",
                body: JSON.stringify(data),
            }), 
            invalidatesTags: ["Review"],
        }),
        reviewUpdate: builder.mutation<{}, {}>({
            query: (data:any) => ({
              url: `/${data?._id}`,
              method: "put",
              body: data,
            }),
            invalidatesTags: ["Review"],
        }),
    }),
 

}) 

export const {
  useReviewCreateMutation,
  useReviewUpdateMutation
} = reviewApi;
  