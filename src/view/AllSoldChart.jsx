import {
  Box,
  Card,
  CardActions,
  CardContent,
  FormControl,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import CustomizedCircularProgress from "@/components/CustomizedCircularProgress";
import ApiReq from "@/util/axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MONTH_TH = [
  "ม.ค.",
  "ก.พ.",
  "มี.ค.",
  "เม.ย.",
  "พ.ค.",
  "มิ.ย.",
  "ก.ค.",
  "ส.ค.",
  "ก.ย.",
  "ต.ค.",
  "พ.ย.",
  "ธ.ค.",
];

const chartOption = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      display: false,
      grid: {
        drawOnChartArea: false,
      },
    },
    x: {
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const getMonthLabels = () => {
  // ข้อมูลจาก api response จำนวนทั้งหมด 31 ค่า
  const monthLabels = [];

  const monthNo = new Date().getMonth() + 1;
  for (let i = 1; i <= 31; i++) {
    const tag = `${i}/${monthNo}`;
    monthLabels.push(tag);
  }
  return monthLabels;
};

const AllSoldChart = () => {
  const [loading, setLoading] = useState(false);

  const [chart, setChart] = useState(null);
  const [type, setType] = useState("month");

  // Counting the number of month and year
  const [totalMonth, setTotalMonth] = useState(0);
  const [totalYear, setTotalYear] = useState(0);

  const getMonthNameInTH = () =>
    new Date().toLocaleDateString("th-TH", {
      month: "long",
    });

  const getCurrentYear = () =>
    new Date()
      .toLocaleDateString("th-TH", {
        year: "numeric",
      })
      .split(" ")[1];

  useEffect(() => {
    getData();
  }, []);

  // Call API
  const getData = async () => {
    try {
      const response = await ApiReq.get("/api/statistic/order");

      if (response.status === 200) {
        const { month, year } = response.data.data;

        // Defualt to be month
        const payload = {
          month: getChartJSPayload("month", month),
          year: getChartJSPayload("year", year),
        };

        setChart(payload);
        setTotalMonth(month.reduce((prev, cur) => prev + cur, 0));
        setTotalYear(year.reduce((prev, cur) => prev + cur, 0));
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const getChartJSPayload = (type, data) => {
    let payload;
    if (type === "month") {
      payload = {
        labels: getMonthLabels(),
        datasets: [
          {
            label: "จำนวนออเดอร์",
            data: data,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      };
    } else {
      // year
      payload = {
        labels: MONTH_TH,
        datasets: [
          {
            label: "จำนวนออเดอร์",
            data,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      };
    }

    return payload;
  };

  return loading ? (
    <Box className="flex justify-center">
      <CustomizedCircularProgress />
    </Box>
  ) : (
    <Card className="p-[8px]">
      <CardActions className="pb-0 mx-[10px] h-[50px]">
        <Box className="flex grow">
          <Typography color="primary">จำนวนคำสั่งซื้อทั้งหมด</Typography>
        </Box>
        <FormControl className="w-[150px]">
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="text-sm"
          >
            <MenuItem value="month" className="text-sm">
              รายเดือน
            </MenuItem>
            <MenuItem value="year" className="text-sm">
              รายปี
            </MenuItem>
          </Select>
        </FormControl>
      </CardActions>

      <CardContent className="h-[200px] pb-[0]">
        {chart && (
          <Line
            options={chartOption}
            data={chart[type] ? chart[type] : []}
            style={{
              height: "200px",
              maxHeight: "200px",
              width: "100%",
              boxSizing: "border-box",
              display: "block",
            }}
          />
        )}
      </CardContent>
      <CardContent className="h-[100px] pb-[24px]">
        <Box className="flex items-center">
          <Box className="grow-[3] shrink basis-0">
            <Box className="flex justify-center items-start">
              <Typography variant="body2" color="text.secondary">
                จำนวนออเดอร์ในเดือน​
              </Typography>
              <Box className="pl-[8px]">
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="font-bold"
                >
                  {getMonthNameInTH()}
                </Typography>
              </Box>
            </Box>
            <Box className="flex justify-center items-start">
              <Typography className="font-bold text-orange-500">
                {totalMonth}
              </Typography>
              <Box className="pl-[8px]">
                <Typography variant="body2" color="text.secondary">
                  ออเดอร์
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box className="grow-[2] shrink basis-0">
            <Box className="flex justify-start items-center">
              <Typography variant="body2" color="text.secondary">
                จำนวนออเดอร์ในปี​
              </Typography>
              <Box className="pl-[8px] font-bold" color="text.secondary">
                {getCurrentYear()}
              </Box>
            </Box>
            <Box className="flex justify-start items-center">
              <Typography variant="body1" className="font-bold text-blue-500">
                {totalYear}
              </Typography>
              <Box className="pl-[8px]">
                <Typography color="text.secondary" variant="body2">
                  ออเดอร์
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AllSoldChart;
