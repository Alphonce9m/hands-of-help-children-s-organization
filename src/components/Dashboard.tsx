'use client';

import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface DashboardProps {
  stats: {
    totalAmount: number;
    totalDonations: number;
    averageDonation: number;
    byPaymentMethod: Record<string, { count: number; amount: number }>;
    byFrequency: Record<string, { count: number; amount: number }>;
    recentDonations: Array<{
      id: string;
      amount: number;
      createdAt: string;
      donor?: { name: string };
    }>;
    topDonors: Array<{
      name: string;
      totalAmount: number;
      donationCount: number;
    }>;
  };
}

const Dashboard: FC<DashboardProps> = ({ stats }) => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  const paymentMethodData = {
    labels: Object.keys(stats.byPaymentMethod),
    datasets: [
      {
        label: 'Amount (KES)',
        data: Object.values(stats.byPaymentMethod).map((m) => m.amount),
        backgroundColor: [
          'rgba(37, 99, 235, 0.8)',
          'rgba(16, 185, 129, 0.8)',
        ],
      },
    ],
  };

  const frequencyData = {
    labels: Object.keys(stats.byFrequency),
    datasets: [
      {
        label: 'Number of Donations',
        data: Object.values(stats.byFrequency).map((f) => f.count),
        backgroundColor: [
          'rgba(37, 99, 235, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
      },
    ],
  };

  return (
    <div className="space-y-8">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-medium text-gray-900">Total Donations</h3>
          <p className="mt-2 text-3xl font-bold text-primary">
            KES {stats.totalAmount.toLocaleString()}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {stats.totalDonations} donations
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-medium text-gray-900">Average Donation</h3>
          <p className="mt-2 text-3xl font-bold text-primary">
            KES {stats.averageDonation.toLocaleString()}
          </p>
          <p className="mt-1 text-sm text-gray-500">Per donation</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-medium text-gray-900">Top Donor</h3>
          <p className="mt-2 text-3xl font-bold text-primary">
            {stats.topDonors[0]?.name || 'N/A'}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            KES {stats.topDonors[0]?.totalAmount.toLocaleString() || '0'}
          </p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Donations by Payment Method
          </h3>
          <div className="h-64">
            <Pie data={paymentMethodData} options={{ maintainAspectRatio: false }} />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Donations by Frequency
          </h3>
          <div className="h-64">
            <Pie data={frequencyData} options={{ maintainAspectRatio: false }} />
          </div>
        </motion.div>
      </div>

      {/* Recent Donations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Donations</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.recentDonations.map((donation) => (
                <tr key={donation.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {donation.donor?.name || 'Anonymous'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    KES {donation.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(donation.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Top Donors */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <h3 className="text-lg font-medium text-gray-900 mb-4">Top Donors</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Donations
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {stats.topDonors.map((donor, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {donor.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    KES {donor.totalAmount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {donor.donationCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard; 