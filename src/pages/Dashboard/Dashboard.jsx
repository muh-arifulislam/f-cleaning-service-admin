import React from "react";
import CardLineChart from "../../components/Cards/CardLineChart";
import CardPieChart from "../../components/Cards/CardPieChart";
import CardBarChart from "../../components/Cards/CardBarChart";

const Dashboard = () => {
  return (
    <>
      <div className="grid lg:md:grid-cols-2 grid-cols-1 gap-8 mb-8">
        <div>
          <CardPieChart />
        </div>
        <div>
          <CardBarChart />
        </div>
      </div>
      <div>
        <CardLineChart />
      </div>
    </>
  );
};

export default Dashboard;
