import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {Task} from "../type/Task";

export const taskApi = createApi({
    reducerPath: "taskApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080/api/tasks"
    }),
    tagTypes: ["Task"],
    endpoints: (builder) => ({
        getTasks: builder.query<Task[],{title:string}>({
            query: ({title=""}) => ({
                url: `?title=${title}`,
                method: "GET",
            }),
            providesTags: ["Task"]
        }),
        getDoneTasks: builder.query<Task[],void>({
            query: () => ({
                url: "/done",
                method: "GET",
            }),
            providesTags: ["Task"]
        }),
        getTaskById: builder.query<Task,string>({
            query: (id) => ({
                url: `/${id}`,
                method: "GET",
            }),
            providesTags: ["Task"]
        }),
        createTask: builder.mutation({
            query: (body) => ({
                url: "/",
                method: "POST",
                body: body,
            }),
            invalidatesTags: ["Task"],
        }),
        updateTask: builder.mutation({
            query: ({id, body}) => ({
                url: `/${id}`,
                method: "PATCH",
                body: body,
            }),
            invalidatesTags: ["Task"],
        }),
        deleteTask: builder.mutation<void,string>({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Task'],
        }),
        deleteDoneTasks:builder.mutation<void,void>({
            query:() =>({
                url:"/done",
                method:"DELETE",
            }),
            invalidatesTags: ['Task'],
        })
    })
});
export const {
    useGetTasksQuery,
    useGetDoneTasksQuery,
    useGetTaskByIdQuery,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useDeleteDoneTasksMutation,
} = taskApi;