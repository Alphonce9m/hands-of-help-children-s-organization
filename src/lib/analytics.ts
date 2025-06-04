import { PrismaClient, Prisma, DonationStatus, DonationFrequency } from '@prisma/client';

const prisma = new PrismaClient();

type PaymentMethod = 'CREDIT_CARD';

interface PaymentStats {
  totalAmount: number;
  totalDonations: number;
  averageDonation: number;
  byPaymentMethod: Record<PaymentMethod, { count: number; amount: number }>;
  byFrequency: Record<DonationFrequency, { count: number; amount: number }>;
  recentDonations: Array<{
    id: string;
    amount: number;
    createdAt: Date;
    donor?: { name: string };
  }>;
  topDonors: Array<{
    name: string;
    totalAmount: number;
    donationCount: number;
  }>;
}

interface TimeRange {
  startDate: Date;
  endDate: Date;
}

interface PaymentMethodStats {
  paymentMethod: PaymentMethod;
  _sum: { amount: number | null };
  _count: number;
}

interface FrequencyStats {
  frequency: DonationFrequency;
  _sum: { amount: number | null };
  _count: number;
}

interface DonorStats {
  donorId: string | null;
  _sum: { amount: number | null };
  _count: number;
}

export async function getPaymentStats(timeRange?: TimeRange): Promise<PaymentStats> {
  const where = timeRange
    ? {
        createdAt: {
          gte: timeRange.startDate,
          lte: timeRange.endDate,
        },
        status: DonationStatus.COMPLETED,
      }
    : {
        status: DonationStatus.COMPLETED,
      };

  const [
    donations,
    totalAmount,
    totalDonations,
    byFrequency,
    topDonors,
  ] = await Promise.all([
    prisma.donation.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { donor: true },
    }),
    prisma.donation.aggregate({
      where,
      _sum: { amount: true },
    }),
    prisma.donation.count({ where }),
    prisma.donation.groupBy({
      by: ['frequency'],
      where,
      _sum: { amount: true },
      _count: true,
    }),
    prisma.donation.groupBy({
      by: ['donorId'],
      where,
      _sum: { amount: true },
      _count: true,
    }),
  ]);

  // Get donor details for top donors
  const donorIds = topDonors
    .filter((d: DonorStats) => d.donorId !== null)
    .map((d: DonorStats) => d.donorId as string);
  
  const donors = await prisma.donor.findMany({
    where: { id: { in: donorIds } },
    select: { id: true, name: true },
  });

  const donorMap = new Map(donors.map((d: { id: string; name: string }) => [d.id, d.name]));


  const byPaymentMethod = {

      count: totalDonations,
      amount: totalAmount._sum.amount || 0,
    },
    CREDIT_CARD: {
      count: 0,
      amount: 0,
    },
  };

  return {
    totalAmount: totalAmount._sum.amount || 0,
    totalDonations,
    averageDonation: totalAmount._sum.amount
      ? totalAmount._sum.amount / totalDonations
      : 0,
    byPaymentMethod,
    byFrequency: byFrequency.reduce(
      (acc: Record<DonationFrequency, { count: number; amount: number }>, curr: FrequencyStats) => ({
        ...acc,
        [curr.frequency]: {
          count: curr._count,
          amount: curr._sum.amount || 0,
        },
      }),
      {} as Record<DonationFrequency, { count: number; amount: number }>
    ),
    recentDonations: donations.map(donation => ({
      id: donation.id,
      amount: donation.amount,
      createdAt: donation.createdAt,
      donor: donation.donor ? { name: donation.donor.name } : undefined,
    })),
    topDonors: topDonors
      .filter((d: DonorStats) => d.donorId !== null)
      .map((d: DonorStats) => ({
        name: donorMap.get(d.donorId as string) || 'Anonymous',
        totalAmount: d._sum.amount || 0,
        donationCount: d._count,
      }))
      .sort((a: { totalAmount: number }, b: { totalAmount: number }) => b.totalAmount - a.totalAmount)
      .slice(0, 10),
  };
}

export async function getMonthlyStats(year: number) {
  const stats = await prisma.donation.groupBy({
    by: ['frequency'],
    where: {
      status: DonationStatus.COMPLETED,
      createdAt: {
        gte: new Date(year, 0, 1),
        lt: new Date(year + 1, 0, 1),
      },
    },
    _sum: { amount: true },
    _count: true,
  });

  return {
    totalAmount: stats.reduce((sum, curr) => sum + (curr._sum.amount || 0), 0),
    count: stats.reduce((sum, curr) => sum + curr._count, 0),
  };
}

export async function getDonorRetentionRate() {
  const totalDonors = await prisma.donor.count();
  const repeatDonors = await prisma.donor.count({
    where: {
      donations: {
        some: {
          createdAt: {
            gte: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000),
          },
        },
      },
    },
  });

  return {
    totalDonors,
    repeatDonors,
    retentionRate: totalDonors ? (repeatDonors / totalDonors) * 100 : 0,
  };
}

export async function getSubscriptionStats() {
  const [
    activeSubscriptions,
    totalRevenue,
    averageSubscriptionAmount,
  ] = await Promise.all([
    prisma.subscription.count({
      where: { status: 'ACTIVE' },
    }),
    prisma.subscription.aggregate({
      where: { status: 'ACTIVE' },
      _sum: { amount: true },
    }),
    prisma.subscription.aggregate({
      where: { status: 'ACTIVE' },
      _avg: { amount: true },
    }),
  ]);

  return {
    activeSubscriptions,
    totalRevenue: totalRevenue._sum.amount || 0,
    averageSubscriptionAmount: averageSubscriptionAmount._avg.amount || 0,
  };
} 