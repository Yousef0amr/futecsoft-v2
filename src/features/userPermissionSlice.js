import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASEURL, USERS_PERMISSIONS } from "../api/endpoints";

import getCookie from "../utils/getCookie";
import { longCacheTime } from "../config/constants";


const transformData = (data) => ({
    ...data,
});



export const userPermissionsApi = createApi({
    reducerPath: 'userPermissionsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: BASEURL + USERS_PERMISSIONS,
        prepareHeaders: (headers) => {
            headers.set('Authorization', `Bearer ${getCookie('accessToken')}`);
            return headers;
        }
    }),
    endpoints: (builder) => ({
        getAllUserPermissions: builder.query({
            query: ({ id }) => ({
                url: `/GetAll?UserNo=${id}`,
            }),
            keepUnusedDataFor: longCacheTime,
            transformResponse: (response) => response.Response || response,
        }),
        getAllUsersPermission: builder.query({
            query: () => ({
                url: `/GetAllUsers`,
            }),
            keepUnusedDataFor: longCacheTime,
            transformResponse: (response) => {
                const data = response.Response || response;
                if (Array.isArray(data)) {
                    return data.map(item => transformData(item));
                } else {
                    return [];
                }
            },
        }),

        addUserPermission: builder.mutation({
            query: (data) => ({
                url: '/Insert',
                method: 'POST',
                body: data,
            }),
        }),
    }),
})


export const {
    useAddUserPermissionMutation,
    useGetAllUserPermissionsQuery,
    useGetAllUsersPermissionQuery
} = userPermissionsApi;

