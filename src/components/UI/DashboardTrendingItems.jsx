import React from "react";

export default function DashboardTrendingItems() {
  const trendingData = [
    {
      rank: 1,
      name: "Burger",
      price: 5.6,
      orders: 89,
      image: "/public/Images/trendingItems/burger.jpg",
    },
    {
      rank: 2,
      name: "Pizza",
      price: 5.6,
      orders: 59,
      image: "/public/Images/trendingItems/pizza.jpg",
    },
    {
      rank: 3,
      name: "Taco",
      price: 5.6,
      orders: 30,
      image: "/public/Images/trendingItems/taco.jpg",
    },
    {
      rank: 4,
      name: "Kacchi",
      price: 5.6,
      orders: 28,
      image: "/public/Images/trendingItems/kacchi.jpg",
    },
  ];

  return (
    <div>
      {trendingData.map((data, index) => {
        return (
          <div
            key={index}
            className="flex items-center justify-between w-96 p-3"
          >
            <div className="flex items-center gap-3">
              <p className="font-semibold">#{data.rank}</p>
              <div>
                <p>{data.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-sm">{data.price}</p>
                  <p className="text-sm text-[#767676]">Order {data.orders}x</p>
                </div>
              </div>
            </div>
            <div className="border p-2 rounded-lg border-gray-200">
              <img src={data.image} alt="" className="size-10" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
