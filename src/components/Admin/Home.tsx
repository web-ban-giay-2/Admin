import { useEffect, useRef, useState } from "react"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ThongKeType {
    year: number
    month: number
    daGiao: number
    daHuy: number
}

const Home = () => {
  const [dataThongKe, setDataThongKe] = useState<ThongKeType[]>([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://localhost:7080/api/DonHang/ThongKe")
        await setDataThongKe(await response.json())
      } catch (error) {
        console.error("Lỗi etching data:", error)
      }
    }

    fetchData()
  }, [])

  console.log(dataThongKe)

  const data = {
    labels: dataThongKe.map((item) => item.month + "/" + item.year),
    datasets: [
      {
        label: "Đơn hàng đã giao",
        data: dataThongKe.map((item) => item.daGiao),
      },
      {
        label: "Đơn hàng đã huỷ",
        data: dataThongKe.map((item) => item.daHuy),
      }
    ],
  };

  return (
    <>
      <h2>Thống kê</h2>
      <div>
      <Bar data={data} />
      </div>
    </>
  )
}

export default Home
