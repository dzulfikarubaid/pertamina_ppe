import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import Image from 'next/image';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface PelanggaranData {
  time: string;
  date: string;
  pelanggaran: string;
}

const generateDummyData = (num: number, startDate: Date, endDate: Date): PelanggaranData[] => {
  const pelanggaranList = ['helm', 'rompi', 'kaca mata', 'sepatu', 'masker', 'ear muff', 'sarung tangan'];
  const data: PelanggaranData[] = [];
  const dateRange = [];

  // Create a date range from startDate to endDate
  for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
    dateRange.push(new Date(d));
  }

  for (let i = 0; i < num; i++) {
    const randomDate = dateRange[Math.floor(Math.random() * dateRange.length)];
    data.push({
      time: faker.date.between(randomDate, new Date()).toLocaleTimeString('id-ID'),
      date: randomDate.toLocaleDateString('id-ID'),
      pelanggaran: pelanggaranList[Math.floor(Math.random() * pelanggaranList.length)],
    });
  }
  return data;
};

const groupDataByDate = (data: PelanggaranData[]): Record<string, number> => {
  return data.reduce((acc: Record<string, number>, item: PelanggaranData) => {
    if (!acc[item.date]) {
      acc[item.date] = 0;
    }
    acc[item.date]++;
    return acc;
  }, {});
};

const groupDataByMonth = (data: PelanggaranData[]): Record<string, number> => {
  return data.reduce((acc: Record<string, number>, item: PelanggaranData) => {
    const [day, month, year] = item.date.split('/');
    const monthYear = `${month}/${year}`;
    if (!acc[monthYear]) {
      acc[monthYear] = 0;
    }
    acc[monthYear]++;
    return acc;
  }, {});
};

const groupDataByYear = (data: PelanggaranData[]): Record<string, number> => {
  return data.reduce((acc: Record<string, number>, item: PelanggaranData) => {
    const year = item.date.split('/')[2];
    if (!acc[year]) {
      acc[year] = 0;
    }
    acc[year]++;
    return acc;
  }, {});
};

export default function Dashboard() {
  const [data, setData] = useState<PelanggaranData[]>([]);
  const [dailyData, setDailyData] = useState<Record<string, number>>({});
  const [monthlyData, setMonthlyData] = useState<Record<string, number>>({});
  const [yearlyData, setYearlyData] = useState<Record<string, number>>({});
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    const startDate = new Date(2024, 4, 20); // 15 May 2024
    const endDate = new Date(); // Current date
    const dummyData = generateDummyData(100, startDate, endDate); // Generate 100 dummy data items
    setData(dummyData);
    setDailyData(groupDataByDate(dummyData));
    setMonthlyData(groupDataByMonth(dummyData));
    setYearlyData(groupDataByYear(dummyData));
  }, []);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Grafik Pelanggaran',
      },
    },
  };

  const chartData = (labels: string[], data: Record<string, number>, borderColor:any, backgroundColor:any) => ({
    labels,
    datasets: [
      {
        label: 'Pelanggaran',
        data: labels.map(label => data[label] || 0),
        borderColor: borderColor,
        backgroundColor: backgroundColor,
      },
    ],
  });

  const dailyLabels = Object.keys(dailyData).sort((a, b) => {
    const [dayA, monthA, yearA] = a.split('/').map(Number);
    const [dayB, monthB, yearB] = b.split('/').map(Number);
    return new Date(yearA, monthA - 1, dayA).getTime() - new Date(yearB, monthB - 1, dayB).getTime();
  });

  const monthlyLabels = Object.keys(monthlyData).sort((a, b) => {
    const [monthA, yearA] = a.split('/').map(Number);
    const [monthB, yearB] = b.split('/').map(Number);
    return new Date(yearA, monthA - 1).getTime() - new Date(yearB, monthB - 1).getTime();
  });

  const yearlyLabels = Object.keys(yearlyData).sort((a, b) => Number(a) - Number(b));
function parseDateTime(date:any, time:any) {
    const [day, month, year] = date.split('/').map(Number);
    const [hours, minutes, seconds] = time.split('.').map(Number);
    return new Date(year, month - 1, day, hours, minutes, seconds);
}

  
  const sortedData = data.sort((a, b) => {
    const dateA:any = parseDateTime(a.date, a.time);
    const dateB:any = parseDateTime(b.date, b.time);
    return dateB - dateA;
});
console.log(sortedData)
const currentData = sortedData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
 console.log(currentData)



  return (
    <div className=''>
      <h1 className='text-2xl font-bold text-left py-4'>Dashboard</h1>
      <div className='flex flex-col gap-10 items-center '>
        <div className='bg-black/5 relative w-[calc(80%+90px)] h-[500px] rounded-xl flex  p-3 flex-col text-left'>
          <Image className='absolute top-0 right-0' src="/logo.png" width={140} height={140} alt='' />
          <h1 className='text-xl pb-4 w-full font-semibold text-left'>Grafik Pelanggaran/hari</h1>
          <div className='w-[100%] h-[400px]'>
            <Line options={chartOptions} data={chartData(dailyLabels, dailyData, 'rgb(0, 99, 255)', 'rgba(0, 99, 255, 0.5)')} />
          </div>
        </div>
        <div className='flex flex-row gap-10'>
          <div className='bg-black/5 relative w-[500px] h-fit rounded-xl flex justify-center items-center p-3 flex-col text-left'>
            <Image className='absolute top-0 right-0' src="/logo.png" width={140} height={140} alt='' />
            <h1 className='text-xl pb-4 w-full font-semibold text-left'>Grafik Pelanggaran/bulan</h1>
            <div style={{ width: '100%', height: '100%', margin: '0 auto' }}>
              <Line options={chartOptions} data={chartData(monthlyLabels, monthlyData, 'rgb(0, 255, 132)', 'rgba(0, 255, 132, 0.5)')} />
            </div>
          </div>
          <div className='bg-black/5 relative w-[500px] h-fit rounded-xl flex justify-center items-center p-3 flex-col text-left'>
            <Image className='absolute top-0 right-0' src="/logo.png" width={140} height={140} alt='' />
            <h1 className='text-xl pb-4 w-full font-semibold text-left'>Grafik Pelanggaran/tahun</h1>
            <div style={{ width: '100%', height: '100%', margin: '0 auto' }}>
              <Line options={chartOptions} data={chartData(yearlyLabels, yearlyData, 'rgb(255, 99, 132)', 'rgba(255, 99, 132, 0.5)')} />
            </div>
          </div>
        </div>
        <table className='table table-auto w-[calc(80%+60px)] border-2'>
          <thead className='text-center'>
            <tr>
              <th className='border-2 p-2 px-3'>Pukul</th>
              <th className='border-2 p-2 px-3'>Tanggal</th>
              <th className='border-2 p-2 px-3'>Pelanggaran</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((item, index)  => (
              <tr className='border-2 p-2 px-3' key={index}>
                <td className='border-2 p-2 px-3'>{item.time}</td>
                <td className='border-2 p-2 px-3'>{item.date}</td>
                <td className='border-2 p-2 px-3'>{item.pelanggaran}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='flex justify-center space-x-4 mb-4'>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className='px-4 py-2 bg-gray-300 rounded disabled:opacity-50'
          >
            Previous
          </button>
          {Array.from({ length: Math.ceil(data.length / itemsPerPage) }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
            className='px-4 py-2 bg-gray-300 rounded disabled:opacity-50'
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
