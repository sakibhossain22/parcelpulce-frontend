
import Chart from 'react-apexcharts';
import DashboardHeader from '../../../DashboardHeader/DashboardHeader';
import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/AxiosSecure/useAxiosSecure';
import { Helmet } from 'react-helmet';

const Statistics = () => {
  const [bookedParcelsData, setbookedParcelsData] = useState([])
  const axiosSecure = useAxiosSecure()

  useEffect(() => {
    axiosSecure.get(`/book-parcel-statistic`)
      .then(res => {
        setbookedParcelsData(res.data)
      })
  }, [axiosSecure])
  const chartData = {
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: bookedParcelsData.map(item => item.date),
      },
    },
    series: [
      {
        name: 'Booked Parcels',
        data: bookedParcelsData.map(item => item.booked),
      },
    ],
  };

  return (
    <div>
      <Helmet>
        <title>PARCELPULCE || STATISTICS</title>
      </Helmet>
      <DashboardHeader header='Bookings By Date'></DashboardHeader>
      <div className='flex items-center mx-auto w-full justify-center'>
        <Chart options={chartData.options} series={chartData.series} type="bar" width={800} height={300} />
      </div>
    </div>
  );
};

export default Statistics;
