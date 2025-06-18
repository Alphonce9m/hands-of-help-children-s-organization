'use client';

import React from 'react';
import Section from '@/components/Section';
import Container from '@/components/Container';
import Card from '@/components/Card';
import Button from '@/components/Button';

interface Donation {
  id: string;
  reference: string;
  amount: number;
  phoneNumber: string;
  type: string;
  status: string;

  transactionDate?: string;
  createdAt: string;
}

interface DonationStats {
  totalAmount: number;
  totalDonations: number;
  successfulDonations: number;
  pendingDonations: number;
  failedDonations: number;
}

const AdminDonationsPage = () => {
  const [donations, setDonations] = React.useState<Donation[]>([]);
  const [stats, setStats] = React.useState<DonationStats>({
    totalAmount: 0,
    totalDonations: 0,
    successfulDonations: 0,
    pendingDonations: 0,
    failedDonations: 0,
  });
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [filter, setFilter] = React.useState<string>('all');

  const fetchDonations = React.useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/donations?filter=${filter}`);
      const data = await response.json();

      if (data.success) {
        setDonations(data.data.donations);
        setStats(data.data.stats);
      } else {
        setError(data.message || 'Failed to fetch donations');
      }
    } catch (err) {
      console.error('Error fetching donations:', err);
      setError('Failed to fetch donations');
    } finally {
      setIsLoading(false);
    }
  }, [filter]);

  React.useEffect(() => {
    fetchDonations();
  }, [fetchDonations]);

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
  };

  if (isLoading) {
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

  if (error) {
    return (
      <Section className="py-16">
        <Container>
          <div className="text-center">
            <p className="text-red-600">{error}</p>
            <Button onClick={fetchDonations} className="mt-4">
              Try Again
            </Button>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <>
      {/* Stats Section */}
      <Section className="py-16 bg-white">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Amount</h3>
              <p className="text-3xl font-bold text-primary">
                KSH {stats.totalAmount.toLocaleString()}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Total Donations</h3>
              <p className="text-3xl font-bold text-primary">
                {stats.totalDonations}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Completed</h3>
              <p className="text-3xl font-bold text-green-600">
                {stats.completedDonations}
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Pending</h3>
              <p className="text-3xl font-bold text-yellow-600">
                {stats.pendingDonations}
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Donations List */}
      <Section className="py-16 bg-gray-50">
        <Container>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Donations</h2>
            <div className="flex space-x-4">
              <Button
                variant={filter === 'all' ? 'primary' : 'outline'}
                onClick={() => handleFilterChange('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'completed' ? 'primary' : 'outline'}
                onClick={() => handleFilterChange('completed')}
              >
                Completed
              </Button>
              <Button
                variant={filter === 'pending' ? 'primary' : 'outline'}
                onClick={() => handleFilterChange('pending')}
              >
                Pending
              </Button>
              <Button
                variant={filter === 'failed' ? 'primary' : 'outline'}
                onClick={() => handleFilterChange('failed')}
              >
                Failed
              </Button>
            </div>
          </div>

          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Reference
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {donations.map((donation: Donation) => (
                    <tr key={donation.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {donation.reference}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        KSH {donation.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {donation.phoneNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                        {donation.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            donation.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : donation.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {donation.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(donation.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
};

export default AdminDonationsPage; 