import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

type PaymentMethod = 'CREDIT_CARD' | 'MPESA';
type DonationFrequency = 'ONE_TIME' | 'MONTHLY' | 'QUARTERLY' | 'YEARLY';

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
  donorId: string;
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
        status: 'COMPLETED',
      }
    : {
        status: 'COMPLETED',
      };

  const [
    payments,
    totalAmount,
    totalDonations,
    byPaymentMethod,
    byFrequency,
    topDonors,
  ] = await Promise.all([
    prisma.payment.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      take: 10,
      include: { donor: true },
    }),
    prisma.payment.aggregate({
      where,
      _sum: { amount: true },
    }),
    prisma.payment.count({ where }),
    prisma.payment.groupBy({
      by: ['paymentMethod'],
      where,
      _sum: { amount: true },
      _count: true,
    }),
    prisma.payment.groupBy({
      by: ['frequency'],
      where,
      _sum: { amount: true },
      _count: true,
    }),
    prisma.payment.groupBy({
      by: ['donorId'],
      where,
      _sum: { amount: true },
      _count: true,
    }),
  ]);

  // Get donor details for top donors
  const donorIds = topDonors.map((d: DonorStats) => d.donorId);
  const donors = await prisma.donor.findMany({
    where: { id: { in: donorIds } },
    select: { id: true, name: true },
  });

  const donorMap = new Map(donors.map((d: { id: string; name: string }) => [d.id, d.name]));

  return {
    totalAmount: totalAmount._sum.amount || 0,
    totalDonations,
    averageDonation: totalAmount._sum.amount
      ? totalAmount._sum.amount / totalDonations
      : 0,
    byPaymentMethod: byPaymentMethod.reduce(
      (acc: Record<PaymentMethod, { count: number; amount: number }>, curr: PaymentMethodStats) => ({
        ...acc,
        [curr.paymentMethod]: {
          count: curr._count,
          amount: curr._sum.amount || 0,
        },
      }),
      {} as Record<PaymentMethod, { count: number; amount: number }>
    ),
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
    recentDonations: payments,
    topDonors: topDonors
      .map((d: DonorStats) => ({
        name: donorMap.get(d.donorId) || 'Anonymous',
        totalAmount: d._sum.amount || 0,
        donationCount: d._count,
      }))
      .sort((a: { totalAmount: number }, b: { totalAmount: number }) => b.totalAmount - a.totalAmount)
      .slice(0, 10),
  };
}

export async function getMonthlyStats(year: number) {
  const stats = await prisma.payment.groupBy({
    by: ['paymentMethod'],
    where: {
      status: 'COMPLETED',
      createdAt: {
        gte: new Date(year, 0, 1),
        lt: new Date(year + 1, 0, 1),
      },
    },
    _sum: { amount: true },
    _count: true,
  });

  return stats.reduce(
    (acc: Record<PaymentMethod, { totalAmount: number; count: number }>, curr: PaymentMethodStats) => ({
      ...acc,
      [curr.paymentMethod]: {
        totalAmount: curr._sum.amount || 0,
        count: curr._count,
      },
    }),
    {} as Record<PaymentMethod, { totalAmount: number; count: number }>
  );
}

export async function getDonorRetentionRate() {
  const totalDonors = await prisma.donor.count();
  const repeatDonors = await prisma.donor.count({
    where: {
      payments: {
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