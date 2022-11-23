import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const roomApi=createApi({
    reducerPath: "roomApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`${process.env.NEXT_PUBLIC_APIURL}/api/room`,
        prepareHeaders:(headers,{getState})=>{
        // By default, if we have a token in the store, let's use that for authenticated requests
        // const token = (getState() as RootState).auth?.loggedInUser?.token;

        // if (token) { 
        //   headers.set("Authorization", `Bearer ${token}`);
        // }
         headers.set("Content-Type", `application/json`);
         return headers;
    }
    }),
    tagTypes: ["Room"], 
    endpoints:(builder)=>({
        roomGetByFiltered: builder.query<[], any>({ 
            query: (arg) => {
                return {
                  url: '/',
                  params: {...arg}, 
                };
            },
            providesTags: ["Room"],
        }),
        roomGetById: builder.query<[], any>({ 
            query: (roomId)=>`/${roomId}`,
            providesTags: ["Room"],
        }),
    }),
 

}) 

export const {
    useRoomGetByFilteredQuery,
    useRoomGetByIdQuery,
} = roomApi;
  