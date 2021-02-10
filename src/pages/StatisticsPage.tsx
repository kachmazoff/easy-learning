import React from "react";
import { Typography } from "antd";
import { ResponsiveCalendar } from "@nivo/calendar";
import { BlockWrapper } from "@/components/BlockWrapper";
import { BasePage } from "./components";

export const StatisticsPage = () => {
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    fetch(process.env.BASE_API_URL + "/statistics")
      .then((x) => x.json())
      .then((x) => {
        console.log(x);
        setData(
          x.total.map((stat) => ({
            value: stat.value,
            day: new Date(stat.day).toLocaleDateString("swe"),
          }))
        );
      });
  }, []);

  return (
    <BasePage>
      <BlockWrapper>
        <Typography.Title>Статистика активности</Typography.Title>
      </BlockWrapper>
      <div style={{ height: "300px" }}>
        <ResponsiveCalendar
          data={data || []}
          from="2021-01-01"
          to="2021-12-31"
          emptyColor="#eeeeee"
          colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
          margin={{ right: 40, left: 40 }}
          yearSpacing={40}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: "bottom",
              direction: "row",
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left",
            },
          ]}
        />
      </div>
    </BasePage>
  );
};
