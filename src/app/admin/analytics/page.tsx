'use client';

import { FC, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Card from '@/components/Card';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AnalyticsData {
  dailyDonations: {
    labels: string[];
    amounts: number[];
  };
  monthlyDonations: {
    labels: string[];
    amounts: number[];
  };
  typeDistribution: {
    labels: string[];
    values: number[];
  };
  statusDistribution: {
    labels: string[];
    values: number[];
  };
}

const AdminAnalyticsPage: FC = () => {
  const { data: session, status } = useSession();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchAnalytics();
    }
  }, [status]);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/admin/analytics');
      const result = await response.json();

      if (result.success) {
        setData(result.data);
      } else {
        setError(result.message || 'Failed to fetch analytics');
      }
    } catch (err) {
      console.error('Error fetching analytics:', err);
      setError('Failed to fetch analytics');
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading') {
    return (
      <Section className="py-16">
        <Container>
          <div className="text-center">
            <p>Loading...</p>
          </div>
        </Container>
      </Section>
    );
  }

  if (isLoading) {
    return (
      <Section className="py-16">
        <Container>
          <div className="text-center">
            <p>Loading analytics...</p>
          </div>
        </Container>
      </Section>
    );
  }

  if (error || !data) {
    return (
      <Section className="py-16">
        <Container>
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <button
              onClick={fetchAnalytics}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
            >
              Try Again
            </button>
          </div>
        </Container>
      </Section>
    );
  }

  const dailyChartData = {
    labels: data.dailyDonations.labels,
    datasets: [
      {
        label: 'Amount (KSH)',
        data: data.dailyDonations.amounts,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  const monthlyChartData = {
    labels: data.monthlyDonations.labels,
    datasets: [
      {
        label: 'Amount (KSH)',
        data: data.monthlyDonations.amounts,
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
    ],
  };

  const typeChartData = {
    labels: data.typeDistribution.labels,
    datasets: [
      {
        data: data.typeDistribution.values,
        backgroundColor: [
          'rgba(59, 130, 246, 0.5)',
          'rgba(16, 185, 129, 0.5)',
          'rgba(245, 158, 11, 0.5)',
        ],
      },
    ],
  };

  const statusChartData = {
    labels: data.statusDistribution.labels,
    datasets: [
      {
        data: data.statusDistribution.values,
        backgroundColor: [
          'rgba(16, 185, 129, 0.5)',
          'rgba(245, 158, 11, 0.5)',
          'rgba(239, 68, 68, 0.5)',
        ],
      },
    ],
  };

  return (
    <>
      {/* Daily Donations Chart */}
      <Section className="py-16 bg-white">
        <Container>
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Daily Donations</h2>
            <div className="h-96">
              <Line
                data={dailyChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </Card>
        </Container>
      </Section>

      {/* Monthly Donations Chart */}
      <Section className="py-16 bg-gray-50">
        <Container>
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-6">Monthly Donations</h2>
            <div className="h-96">
              <Bar
                data={monthlyChartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                  },
                }}
              />
            </div>
          </Card>
        </Container>
      </Section>

      {/* Distribution Charts */}
      <Section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Donation Types</h2>
              <div className="h-64">
                <Doughnut
                  data={typeChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Status Distribution</h2>
              <div className="h-64">
                <Doughnut
                  data={statusChartData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
};

export default AdminAnalyticsPage; 