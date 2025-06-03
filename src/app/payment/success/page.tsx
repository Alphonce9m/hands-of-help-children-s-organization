import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getDonationByReference } from '@/lib/donations';

type PaymentSuccessProps = {
  params: {
    reference: string;
  };
};

export default function PaymentSuccessPage({ params }: PaymentSuccessProps) {
  const { reference } = params;
  const router = useRouter();
  const { toast } = useToast();
  const searchParams = useSearchParams();

  useEffect(() => {
    const checkDonationStatus = async () => {
      try {
        const donation = await getDonationByReference(reference);
        
        if (!donation) {
          throw new Error('Donation not found');
        }

        if (donation.status === 'PENDING') {
          // If payment is still pending, show message
          toast({
            title: 'Payment Pending',
            description: 'Your payment is being processed. Please wait for confirmation.',
          });
          router.push('/donate');
        } else if (donation.status === 'FAILED') {
          toast({
            title: 'Payment Failed',
            description: 'Your payment was not successful. Please try again.',
            variant: 'destructive',
          });
          router.push('/donate');
        }
      } catch (error) {
        console.error('Error checking donation status:', error);
        toast({
          title: 'Error',
          description: 'Failed to check payment status. Please contact support.',
          variant: 'destructive',
        });
        router.push('/donate');
      }
    };

    checkDonationStatus();
  }, [reference, router, toast]);

  return (
    <div className="container mx-auto py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Payment Confirmation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">
              Thank you for your donation! Your payment is being processed.
              You will receive a confirmation message shortly.
            </p>
            <p className="text-gray-600">
              Reference Number: {reference}
            </p>
            <Button
              onClick={() => router.push('/donate')}
              className="w-full mt-4"
            >
              Make Another Donation
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
