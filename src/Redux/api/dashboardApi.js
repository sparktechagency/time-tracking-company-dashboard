import { baseApi } from "../baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    dashboardOverview: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: "/dashboard/general-stats",
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["user"],
    }),
    employeeByMonth: builder.query({
      query: (year) => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/dashboard/monthly-revenue-stripe?year=${year}`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["user"],
    }),
    companyByMonth: builder.query({
      query: () => {
        const accessToken = sessionStorage.getItem("accessToken");
        return {
          url: `/dashboard/total-company-monthly`,
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
      },
      providesTags: ["user"],
    }),
  }),
});

export const {
  useDashboardOverviewQuery,
  useEmployeeByMonthQuery,
  useCompanyByMonthQuery,
} = dashboardApi;
