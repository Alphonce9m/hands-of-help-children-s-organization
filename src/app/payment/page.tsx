import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSession } from 'next-auth/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { createDonation } from '@/lib/donations';

const donationSchema = z.object({
  amount: z.number().min(100, 'Minimum donation is KES 100'),
  phoneNumber: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(13, 'Phone number must be at most 13 digits')
    .regex(/^\+?254\d{9}$|^[7]\d{8}$/, 'Invalid phone number format'),
  name: z.string().optional(),
  email: z.string().email().optional(),
});

type DonationFormValues = z.infer<typeof donationSchema>;

export default function PaymentPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      amount: 1000,
      phoneNumber: '',
      name: session?.user?.name || '',
      email: session?.user?.email || '',
    },
  });

  const onSubmit = async (data: DonationFormValues) => {
    try {
      setIsLoading(true);
      
      // Create donation record
      const donation = await createDonation({
        ...data,
        amount: Number(data.amount),
        phoneNumber: data.phoneNumber.startsWith('+254') ? data.phoneNumber : `+254${data.phoneNumber}`,
      });

      // Redirect to M-Pesa payment
      router.push(`/payment/success?reference=${donation.reference}`);
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: 'Payment Error',
        description: 'There was an error processing your payment. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Make a Donation</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Donation Amount (KES)</Label>
                <Input
                  type="number"
                  id="amount"
                  {...register('amount')}
                  className="w-full"
                  min="100"
                  step="100"
                />
                {errors.amount && (
                  <p className="text-sm text-red-500">{errors.amount.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  type="tel"
                  id="phoneNumber"
                  placeholder="2547XXXXXXXX or +2547XXXXXXXX"
                  {...register('phoneNumber')}
                  className="w-full"
                />
                {errors.phoneNumber && (
                  <p className="text-sm text-red-500">{errors.phoneNumber.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="name">Full Name (Optional)</Label>
                <Input
                  type="text"
                  id="name"
                  {...register('name')}
                  className="w-full"
                />
              </div>

              <div>
                <Label htmlFor="email">Email (Optional)</Label>
                <Input
                  type="email"
                  id="email"
                  {...register('email')}
                  className="w-full"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Make Donation'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
