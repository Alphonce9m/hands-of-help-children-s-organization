"use client";
import Image from 'next/image';

export default function AutomatedDonationForm() {
  const mchangaUrl = "https://www.mchanga.africa/fundraiser/116090";

  return (
    <div className="max-w-lg mx-auto mb-12 p-8 bg-white rounded-xl shadow-2xl border border-primary-100 text-center">
      <div className="relative h-12 w-48 mx-auto mb-4">
        <Image
          src="/mchanga-logo.png"
          alt="Mchanga Logo"
          fill
          className="object-contain"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
          priority
        />
      </div>
      <h2 className="text-2xl font-bold mb-3 text-primary">Donate via Mchanga</h2>
      <p className="mb-6 text-gray-700">
        Support our cause by making a secure donation through Mchanga. 
        Click the button below to proceed to our fundraising page.
      </p>
      <a
        href={mchangaUrl}
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-block bg-green-600 text-white px-10 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg"
      >
        Donate Securely on Mchanga
      </a>
      <p className="mt-4 text-sm text-gray-500">
        You will be redirected to the Mchanga platform.
      </p>
      {/* The extra closing brace was removed from here */}
      <div className="mt-8 text-xs text-gray-500 text-center">
        <span className="font-semibold">Data Privacy:</span> Your information is encrypted and used only for processing your donation. We never share your details.
      </div>
    </div>
  );
}
