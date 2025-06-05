import Newsletter from '@/components/Newsletter';

export default function NewsletterPage() {
  return (
    <main className="min-h-[80vh] flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold mb-6 text-primary">Newsletter</h1>
      <Newsletter />
    </main>
  );
}
