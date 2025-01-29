import React from "react";
import { ResponsiveBar } from "@nivo/bar";

const CardBarChart = () => {
  const data = [
    {
      country: "AD",
      "hot dog": 169,
      "hot dogColor": "hsl(81, 70%, 50%)",
      burger: 191,
      burgerColor: "hsl(1, 70%, 50%)",
      sandwich: 124,
      sandwichColor: "hsl(6, 70%, 50%)",
      kebab: 180,
      kebabColor: "hsl(139, 70%, 50%)",
      fries: 187,
      friesColor: "hsl(295, 70%, 50%)",
      donut: 51,
      donutColor: "hsl(18, 70%, 50%)",
    },
    {
      country: "AE",
      "hot dog": 111,
      "hot dogColor": "hsl(327, 70%, 50%)",
      burger: 168,
      burgerColor: "hsl(317, 70%, 50%)",
      sandwich: 193,
      sandwichColor: "hsl(118, 70%, 50%)",
      kebab: 4,
      kebabColor: "hsl(262, 70%, 50%)",
      fries: 144,
      friesColor: "hsl(202, 70%, 50%)",
      donut: 30,
      donutColor: "hsl(185, 70%, 50%)",
    },
    {
      country: "AF",
      "hot dog": 71,
      "hot dogColor": "hsl(134, 70%, 50%)",
      burger: 86,
      burgerColor: "hsl(220, 70%, 50%)",
      sandwich: 183,
      sandwichColor: "hsl(35, 70%, 50%)",
      kebab: 1,
      kebabColor: "hsl(136, 70%, 50%)",
      fries: 70,
      friesColor: "hsl(230, 70%, 50%)",
      donut: 45,
      donutColor: "hsl(4, 70%, 50%)",
    },
    {
      country: "AG",
      "hot dog": 141,
      "hot dogColor": "hsl(16, 70%, 50%)",
      burger: 166,
      burgerColor: "hsl(110, 70%, 50%)",
      sandwich: 12,
      sandwichColor: "hsl(199, 70%, 50%)",
      kebab: 191,
      kebabColor: "hsl(55, 70%, 50%)",
      fries: 95,
      friesColor: "hsl(38, 70%, 50%)",
      donut: 194,
      donutColor: "hsl(11, 70%, 50%)",
    },
  ];
  return (
    <div className="lg:md:h-[70vh] h-[30vh] px-5 bg-slate-200 rounded">
      <ResponsiveBar
        data={data}
        keys={["hot dog", "burger", "sandwich", "kebab", "fries", "donut"]}
        indexBy="country"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "#38bcb2",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "#eed312",
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: "fries",
            },
            id: "dots",
          },
          {
            match: {
              id: "sandwich",
            },
            id: "lines",
          },
        ]}
        borderColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "country",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "food",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in country: " + e.indexValue
        }
      />
    </div>
  );
};

export default CardBarChart;
