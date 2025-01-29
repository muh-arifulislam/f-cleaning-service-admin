import React from "react";
import { ResponsiveLine } from "@nivo/line";

const CardLineChart = () => {
  const data = [
    {
      id: "japan",
      color: "hsl(233, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 197,
        },
        {
          x: "helicopter",
          y: 149,
        },
        {
          x: "boat",
          y: 75,
        },
        {
          x: "train",
          y: 228,
        },
        {
          x: "subway",
          y: 286,
        },
        {
          x: "bus",
          y: 42,
        },
        {
          x: "car",
          y: 57,
        },
        {
          x: "moto",
          y: 143,
        },
        {
          x: "bicycle",
          y: 21,
        },
        {
          x: "horse",
          y: 196,
        },
        {
          x: "skateboard",
          y: 43,
        },
        {
          x: "others",
          y: 90,
        },
      ],
    },
    {
      id: "france",
      color: "hsl(22, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 2,
        },
        {
          x: "helicopter",
          y: 261,
        },
        {
          x: "boat",
          y: 263,
        },
        {
          x: "train",
          y: 42,
        },
        {
          x: "subway",
          y: 52,
        },
        {
          x: "bus",
          y: 111,
        },
        {
          x: "car",
          y: 249,
        },
        {
          x: "moto",
          y: 62,
        },
        {
          x: "bicycle",
          y: 259,
        },
        {
          x: "horse",
          y: 67,
        },
        {
          x: "skateboard",
          y: 73,
        },
        {
          x: "others",
          y: 79,
        },
      ],
    },
    {
      id: "us",
      color: "hsl(7, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 121,
        },
        {
          x: "helicopter",
          y: 207,
        },
        {
          x: "boat",
          y: 243,
        },
        {
          x: "train",
          y: 287,
        },
        {
          x: "subway",
          y: 283,
        },
        {
          x: "bus",
          y: 98,
        },
        {
          x: "car",
          y: 89,
        },
        {
          x: "moto",
          y: 27,
        },
        {
          x: "bicycle",
          y: 212,
        },
        {
          x: "horse",
          y: 269,
        },
        {
          x: "skateboard",
          y: 240,
        },
        {
          x: "others",
          y: 151,
        },
      ],
    },
    {
      id: "germany",
      color: "hsl(164, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 247,
        },
        {
          x: "helicopter",
          y: 80,
        },
        {
          x: "boat",
          y: 265,
        },
        {
          x: "train",
          y: 22,
        },
        {
          x: "subway",
          y: 103,
        },
        {
          x: "bus",
          y: 23,
        },
        {
          x: "car",
          y: 40,
        },
        {
          x: "moto",
          y: 58,
        },
        {
          x: "bicycle",
          y: 4,
        },
        {
          x: "horse",
          y: 75,
        },
        {
          x: "skateboard",
          y: 228,
        },
        {
          x: "others",
          y: 70,
        },
      ],
    },
    {
      id: "norway",
      color: "hsl(77, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 134,
        },
        {
          x: "helicopter",
          y: 254,
        },
        {
          x: "boat",
          y: 16,
        },
        {
          x: "train",
          y: 50,
        },
        {
          x: "subway",
          y: 69,
        },
        {
          x: "bus",
          y: 187,
        },
        {
          x: "car",
          y: 57,
        },
        {
          x: "moto",
          y: 203,
        },
        {
          x: "bicycle",
          y: 71,
        },
        {
          x: "horse",
          y: 140,
        },
        {
          x: "skateboard",
          y: 181,
        },
        {
          x: "others",
          y: 26,
        },
      ],
    },
  ];
  return (
    <div className="lg:md:h-[80vh] h-[30vh]">
      <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: true,
          reverse: false,
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "transportation",
          legendOffset: 36,
          legendPosition: "middle",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "count",
          legendOffset: -40,
          legendPosition: "middle",
        }}
        pointSize={10}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
          {
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 100,
            translateY: 0,
            itemsSpacing: 0,
            itemDirection: "left-to-right",
            itemWidth: 80,
            itemHeight: 20,
            itemOpacity: 0.75,
            symbolSize: 12,
            symbolShape: "circle",
            symbolBorderColor: "rgba(0, 0, 0, .5)",
            effects: [
              {
                on: "hover",
                style: {
                  itemBackground: "rgba(0, 0, 0, .03)",
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
      />
    </div>
  );
};

export default CardLineChart;
