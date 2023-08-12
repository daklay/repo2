import React, { useEffect, useState } from "react";
import { Chart } from "primereact/chart";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";

const CreationEnRetard = () => {
  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [selecteMounth, setSelectedMounth] = useState(null);
  const Mounth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];
  const [Year, setYear] = useState(null);

  useEffect(() => {
    const data = {
      labels: ["site1", "site2", "site3", "site4", "site5", "site6", "site7"],
      datasets: [
        {
          label: "web sites",
          backgroundColor: "#00bb7e",
          borderColor: "#00bb7e",
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    };
    const options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem) => `test : ${tooltipItem.raw} `, // To change Text On Hover Bar
            afterLabel: (yyy) => "ddjd", //This To Add A text After label
          },
        },
        legend: {
          labels: {
            fontColor: "#495057",
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#495057",
            font: {
              weight: 500,
            },
          },
          grid: {
            display: false,
            drawBorder: false,
          },
        },
        y: {
          ticks: {
            color: "#495057",
          },
          grid: {
            color: "#ebedef",
            drawBorder: false,
          },
        },
      },
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  return (
    <>
      <Chart type="bar" data={chartData} options={chartOptions} />
      <Dropdown
        value={selecteMounth}
        onChange={(e) => setSelectedMounth(e.value)}
        options={Mounth}
        // optionLabel="name"
        placeholder="Select a Country"
        filter
        className=" w-8rem "
        style={{ marginTop: "2rem" }}
      />
      <Calendar
        value={Year}
        onChange={(e) => setYear(e.value)}
        placeholder="Select Year"
        view="year"
        dateFormat="yy"
        className=" w-8rem "
        style={{ marginTop: "2rem", marginLeft: "2rem" }}
      />
    </>
  );
};

export default CreationEnRetard;
