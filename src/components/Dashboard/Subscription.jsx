import { Card, CardContent, Button, CircularProgress } from "@mui/material";
import { useGetSubscriptionPlansQuery } from "../../Redux/api/dashboardApi";
import { GoDotFill } from "react-icons/go";

export default function Subscription() {
  const { data: subscriptionPlansData, isLoading } =
    useGetSubscriptionPlansQuery();
  const subscriptionPlans = subscriptionPlansData?.data || [];
  console.log("subscriptionPlans", subscriptionPlans);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[92vh]">
        <CircularProgress
          sx={{
            color: "#3F80AE",
            width: "50px !important",
            height: "50px !important",
          }}
        />
      </div>
    );
  }

  return (
    <div className="px-10 py-8 bg-[#efefef] h-[92vh] rounded-lg flex gap-8 justify-center flex-wrap">
      {subscriptionPlans.map((subscription) => (
        <div
          className="flex flex-col gap-5 sm:w-[45%] md:w-[30%] max-w-[345px]"
          key={subscription.id}
        >
          <div className="bg-[#3F80AE] rounded-lg py-3 px-5 text-white">
            <div className="flex items-center justify-between">
              <p className="text-lg font-semibold">{subscription.name}</p>
              <p className="text-lg font-semibold"> ${subscription.price}</p>
            </div>
            <p className="text-xs mt-2">Payment Package</p>
          </div>
          <Card
            sx={{
              bgcolor: "#6599BE",
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            <CardContent>
              <div className="flex flex-col gap-3 text-center text-white min-h-[400px]">
                <p className="text-2xl">{subscription.name}</p>
                <p className="text-3xl font-medium">${subscription.price}</p>
                <p className="text-sm text-justify">
                  {subscription.description}
                </p>
                {subscription.features.map((feature, index) => (
                  <div key={index} className="text-sm flex items-center gap-1">
                    <GoDotFill /> <p>{feature}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
