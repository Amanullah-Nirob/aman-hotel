import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

import { RegisterRequest,AuthResponse,LoginRequest } from "../interface/userinterface";


export const userApi=createApi({
    reducerPath: "userApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${process.env.NEXT_PUBLIC_APIURL}/user`,
        prepareHeaders:(headers,{getState})=>{
        // By default, if we have a token in the store, let's use that for authenticated requests
        const token = (getState() as RootState).auth?.loggedInUser?.token;

        if (token) { 
          headers.set("Authorization", `Bearer ${token}`);
        }
         return headers;
    }
    }),
    tagTypes: ["User"], 
    endpoints:(builder)=>({
        registerUser:builder.mutation<AuthResponse,RegisterRequest>({
            query:(data)=>({
                url: "/register",
                method: "POST",
                headers:{ "Content-Type":"application/json"},
                body: JSON.stringify(data),
            }),
            invalidatesTags: ["User"],
        }),
 
        login: builder.mutation<AuthResponse, LoginRequest>({
            query: (data) => ({
              url: "/login",
              method: "POST",
              headers:{ "Content-Type":"application/json"},
              body: JSON.stringify(data),
            }),
            invalidatesTags: ["User"],
        }),
        profilePhotoUpdate: builder.mutation<{}, FormData>({
            query: (data) => ({
              url: "/update/profile-pic",
              method: "put",
              body: data,
            }),
            invalidatesTags: ["User"],
        }),
    }),
 

}) 

export const {
    useRegisterUserMutation,
    useLoginMutation,
    useProfilePhotoUpdateMutation
} = userApi;
  