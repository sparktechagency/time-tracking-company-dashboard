import { baseApi } from "../baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getLeaveRequests: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/leavemanagement",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["leave"],
    }),
    // getLeaveBalance: builder.query({
    //   query: () => {
    //     const accessToken = sessionStorage.getItem("accessToken");
    //     return {
    //       url: "/leavebalance",
    //       method: "GET",
    //       headers: {
    //         Authorization: `Bearer ${accessToken}`,
    //       },
    //     };
    //   },
    //   providesTags: ["leave"],
    // }),

    createLeave: builder.mutation({
      query: (data) => {
        const accessToken = sessionStorage.getItem("accessToken");
        console.log("Dashboard API Token:", accessToken);

        console.log("create leave api data", data);

        return {
          url: "/leavebalance",
          method: "post",
          body: data,
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      invalidatesTags: ["leave"],
    }),
  }),
});

export const {
  useGetLeaveRequestsQuery,
  // useGetLeaveBalanceQuery,
  useCreateLeaveMutation,
} = dashboardApi;
