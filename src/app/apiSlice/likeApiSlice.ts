import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const likeApi=createApi({
    reducerPath: "likeApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${process.env.NEXT_PUBLIC_APIURL}/like`,
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
    tagTypes: ["Like"], 
    endpoints:(builder)=>({
        likeCreate:builder.mutation<{},{}>({
            query:(data)=>({
                url: "/",
                method: "POST",
                body: JSON.stringify(data),
            }), 
            invalidatesTags: ["Like"]
        }),
        likeDelete: builder.mutation<{}, {}>({
            query: (data:any) => ({
              url: `/${data?.likeId}`,
              method: "delete",
              body: data,
            }),
         invalidatesTags: ["Like"],
        }),
    }),
 

}) 

export const {
    useLikeCreateMutation,
    useLikeDeleteMutation
} = likeApi;
  