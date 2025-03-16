import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL, POS_STATIONS } from './../api/endpoints.js';
import getCookie from './../utils/getCookie.js';


export const posStationApi = createApi({
    reducerPath: 'posStationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL + POS_STATIONS,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
            return headers
        }
    }),
    endpoints: (builder) => ({
        getAllPosStations: builder.query({
            query: () => '/GetAll',
            transformResponse: (response) => response.Response || response,
        }),

    }),
});

export const { useGetAllPosStationsQuery } = posStationApi;
